require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8000',
  credentials: true
}));
app.use(express.json());

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Google Calendar OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials from refresh token (for your own calendar)
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// In-memory store for pending bookings (in production, use a database)
const pendingBookings = new Map();

// Cleanup old pending bookings after 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, booking] of pendingBookings.entries()) {
    if (now - booking.createdAt > 15 * 60 * 1000) {
      pendingBookings.delete(sessionId);
    }
  }
}, 60000);

/**
 * POST /api/create-checkout-session
 * Creates a Stripe checkout session for the consultation booking
 */
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { name, email, company, selectedDate, selectedTime, timezone } = req.body;

    // Validate required fields
    if (!name || !email || !selectedDate || !selectedTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate the actual datetime
    const bookingDateTime = new Date(`${selectedDate}T${selectedTime}:00${timezone}`);
    const endTime = new Date(bookingDateTime.getTime() + 30 * 60 * 1000); // 30 minutes

    // Create a unique session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store booking info temporarily
    pendingBookings.set(sessionId, {
      name,
      email,
      company: company || '',
      selectedDate,
      selectedTime,
      timezone,
      bookingDateTime: bookingDateTime.toISOString(),
      endTime: endTime.toISOString(),
      createdAt: Date.now()
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: '30-Minute Business Consultation',
              description: 'Expert consultation with Cascadia Tech Partners',
            },
            unit_amount: 5000, // $50.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/booking-success.html?session_id=${sessionId}`,
      cancel_url: `${process.env.FRONTEND_URL}/booking.html?canceled=true`,
      customer_email: email,
      metadata: {
        sessionId,
        bookingType: 'consultation'
      },
      expires_at: Math.floor(Date.now() / 1000) + (15 * 60), // 15 minutes
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

/**
 * POST /api/confirm-booking
 * Called after successful payment to create Google Calendar event
 */
app.post('/api/confirm-booking', async (req, res) => {
  try {
    const { sessionId, stripeSessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    // Verify the Stripe payment
    const stripeSession = await stripe.checkout.sessions.retrieve(stripeSessionId);
    
    if (stripeSession.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // Get booking info
    const booking = pendingBookings.get(sessionId);
    if (!booking) {
      return res.status(400).json({ error: 'Booking session expired or not found' });
    }

    // Create Google Calendar event
    const event = {
      summary: `Consultation - ${booking.name}`,
      description: `30-minute business consultation\n\nClient: ${booking.name}\nEmail: ${booking.email}\nCompany: ${booking.company || 'N/A'}\n\nBooked via: ${process.env.FRONTEND_URL}`,
      start: {
        dateTime: booking.bookingDateTime,
        timeZone: booking.timezone.replace(/GMT/, 'UTC')
      },
      end: {
        dateTime: booking.endTime,
        timeZone: booking.timezone.replace(/GMT/, 'UTC')
      },
      attendees: [
        { email: booking.email, displayName: booking.name }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 1440 }, // 24 hours before
          { method: 'popup', minutes: 30 }     // 30 minutes before
        ]
      }
    };

    const calendarEvent = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all' // Send email invitations
    });

    // Clean up pending booking
    pendingBookings.delete(sessionId);

    res.json({ 
      success: true, 
      eventId: calendarEvent.data.id,
      eventLink: calendarEvent.data.htmlLink
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ error: 'Failed to confirm booking' });
  }
});

/**
 * GET /api/available-slots
 * Returns available 30-minute slots for the next 14 days
 */
app.get('/api/available-slots', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date required (YYYY-MM-DD)' });
    }

    // Define business hours (9 AM - 5 PM in your timezone)
    const businessStart = 9; // 9 AM
    const businessEnd = 17;  // 5 PM
    const slotDuration = 30; // minutes

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    // Get existing events for the day
    const eventsResponse = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    const existingEvents = eventsResponse.data.items || [];
    
    // Generate all possible slots
    const slots = [];
    const dayStart = new Date(`${date}T${String(businessStart).padStart(2, '0')}:00:00`);
    
    for (let hour = businessStart; hour < businessEnd; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const slotStart = new Date(dayStart);
        slotStart.setHours(hour, minute, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

        // Check if slot conflicts with existing events
        const hasConflict = existingEvents.some(event => {
          const eventStart = new Date(event.start.dateTime || event.start.date);
          const eventEnd = new Date(event.end.dateTime || event.end.date);
          return (slotStart < eventEnd && slotEnd > eventStart);
        });

        // Only add future slots
        const now = new Date();
        if (!hasConflict && slotStart > now) {
          slots.push({
            time: slotStart.toTimeString().substr(0, 5), // HH:MM format
            datetime: slotStart.toISOString()
          });
        }
      }
    }

    res.json({ date, slots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Booking backend running on port ${PORT}`);
});
