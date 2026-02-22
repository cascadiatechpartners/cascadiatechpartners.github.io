// Booking page JavaScript
// IMPORTANT: Replace with your actual backend URL after deploying to Render
const BACKEND_URL = 'http://localhost:3000'; // Update this after deployment
const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_key_here'; // Update with your Stripe key

// Initialize Stripe
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// State
let bookingData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  selectedDate: '',
  selectedTime: '',
  timezone: ''
};

let selectedSessionId = null;

// DOM Elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const bookingForm = document.getElementById('bookingForm');
const selectedDateInput = document.getElementById('selectedDate');
const timeSlotsContainer = document.getElementById('timeSlotsContainer');
const timeSlotsEl = document.getElementById('timeSlots');
const slotsLoading = document.getElementById('slotsLoading');
const slotsError = document.getElementById('slotsError');
const btnStep1 = document.getElementById('btnStep1');
const btnStep2 = document.getElementById('btnStep2');
const btnPay = document.getElementById('btnPay');
const btnBack2 = document.getElementById('btnBack2');
const btnBack3 = document.getElementById('btnBack3');
const canceledMessage = document.getElementById('canceledMessage');
const paymentError = document.getElementById('paymentError');

// Get timezone offset
function getTimezoneOffset() {
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  return `GMT${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Display timezone
  const tz = getTimezoneOffset();
  document.getElementById('timezoneDisplay').textContent = tz;
  bookingData.timezone = tz;
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  selectedDateInput.setAttribute('min', today);
  
  // Check for canceled parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('canceled') === 'true') {
    canceledMessage.classList.remove('hidden');
  }
  
  // Event listeners
  btnStep1.addEventListener('click', validateStep1);
  btnStep2.addEventListener('click', validateStep2);
  btnPay.addEventListener('click', proceedToPayment);
  btnBack2.addEventListener('click', () => showStep(step1));
  btnBack3.addEventListener('click', () => showStep(step2));
  selectedDateInput.addEventListener('change', loadTimeSlots);
});

function showStep(stepElement) {
  step1.classList.add('hidden');
  step2.classList.add('hidden');
  step3.classList.add('hidden');
  stepElement.classList.remove('hidden');
}

function validateStep1() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const phone = document.getElementById('phone').value.trim();
  
  if (!name || !email) {
    alert('Please fill in your name and email address.');
    return;
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  bookingData.name = name;
  bookingData.email = email;
  bookingData.company = company;
  bookingData.phone = phone;
  
  showStep(step2);
}

async function loadTimeSlots() {
  const date = selectedDateInput.value;
  if (!date) return;
  
  bookingData.selectedDate = date;
  
  // Show loading
  timeSlotsContainer.classList.add('hidden');
  slotsLoading.classList.remove('hidden');
  slotsError.classList.add('hidden');
  timeSlotsEl.innerHTML = '';
  btnStep2.disabled = true;
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/available-slots?date=${date}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to load time slots');
    }
    
    if (data.slots.length === 0) {
      slotsError.textContent = 'No available time slots for this date. Please select another date.';
      slotsError.classList.remove('hidden');
    } else {
      data.slots.forEach(slot => {
        const slotEl = document.createElement('div');
        slotEl.className = 'time-slot';
        slotEl.textContent = slot.time;
        slotEl.addEventListener('click', () => selectTimeSlot(slot.time, slotEl));
        timeSlotsEl.appendChild(slotEl);
      });
      timeSlotsContainer.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error loading time slots:', error);
    slotsError.textContent = 'Failed to load available time slots. Please try again.';
    slotsError.classList.remove('hidden');
  } finally {
    slotsLoading.classList.add('hidden');
  }
}

function selectTimeSlot(time, element) {
  // Remove previous selection
  document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
  
  // Add selection
  element.classList.add('selected');
  bookingData.selectedTime = time;
  btnStep2.disabled = false;
}

function validateStep2() {
  if (!bookingData.selectedDate || !bookingData.selectedTime) {
    alert('Please select a date and time slot.');
    return;
  }
  
  // Update summary
  const dateTime = new Date(`${bookingData.selectedDate}T${bookingData.selectedTime}:00`);
  const formattedDate = dateTime.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = dateTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit'
  });
  
  document.getElementById('summaryDateTime').textContent = `${formattedDate} at ${formattedTime}`;
  document.getElementById('summaryClient').textContent = `${bookingData.name}${bookingData.company ? ` (${bookingData.company})` : ''}`;
  
  showStep(step3);
}

async function proceedToPayment() {
  paymentError.classList.add('hidden');
  btnPay.disabled = true;
  btnPay.textContent = 'Processing...';
  
  try {
    // Create checkout session
    const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: bookingData.name,
        email: bookingData.email,
        company: bookingData.company,
        selectedDate: bookingData.selectedDate,
        selectedTime: bookingData.selectedTime,
        timezone: bookingData.timezone
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }
    
    // Store session ID for confirmation
    selectedSessionId = data.sessionId;
    
    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Payment error:', error);
    paymentError.textContent = error.message || 'Failed to process payment. Please try again.';
    paymentError.classList.remove('hidden');
    btnPay.disabled = false;
    btnPay.textContent = 'Proceed to Payment →';
  }
}
