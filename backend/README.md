# Booking System Setup Guide

This guide walks you through setting up the consultation booking system with Stripe payments and Google Calendar integration.

## Overview

- **Frontend**: Static HTML/JS hosted on GitHub Pages
- **Backend**: Node.js/Express API hosted on Render.com
- **Payment**: Stripe Checkout ($50 consultation)
- **Calendar**: Google Calendar API with OAuth

## Prerequisites

- Stripe account (https://stripe.com)
- Google Cloud Platform account
- Render.com account
- Node.js 18+ installed locally (for testing)

---

## Step 1: Stripe Setup

1. **Create a Stripe account** at https://stripe.com

2. **Get your API keys**:
   - Go to Dashboard → Developers → API keys
   - Copy your **Publishable key** (`pk_test_...`) and **Secret key** (`sk_test_...`)
   - For production, use the live keys (not test keys)

3. **Configure Stripe Checkout** (optional):
   - The system uses Stripe Checkout which is pre-configured
   - No additional setup needed

---

## Step 2: Google Calendar API Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com

2. **Create a new project** (or select existing):
   - Click the project dropdown → "New Project"
   - Name it "Cascadia Booking System"

3. **Enable the Google Calendar API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

4. **Create OAuth credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure the OAuth consent screen:
     - User Type: "External"
     - App name: "Cascadia Tech Partners Booking"
     - Add your email as developer contact
   - Application type: "Web application"
   - Name: "Booking System"
   - Authorized redirect URIs: `https://your-app-name.onrender.com/auth/google/callback`
   - Click "Create"
   - Copy your **Client ID** and **Client Secret**

5. **Get your Google Refresh Token**:
   
   Create a temporary script to get your refresh token:

   ```bash
   # Install Google's OAuth2 client
   npm install googleapis
   ```

   Create `get-refresh-token.js`:
   ```javascript
   const {google} = require('googleapis');
   const http = require('http');

   const oauth2Client = new google.auth.OAuth2(
     'YOUR_CLIENT_ID',
     'YOUR_CLIENT_SECRET',
     'http://localhost:3000/oauth2callback'
   );

   const scopes = ['https://www.googleapis.com/auth/calendar'];
   const authorizeUrl = oauth2Client.generateAuthUrl({
     access_type: 'offline',
     scope: scopes,
     prompt: 'consent'
   });

   console.log('Authorize: ' + authorizeUrl);
   console.log('\nOpen this URL in your browser, authorize, and paste the code below:');

   // Simple server to catch the callback
   http.createServer(async (req, res) => {
     if (req.url.startsWith('/oauth2callback')) {
       const url = new URL(req.url, 'http://localhost:3000');
       const code = url.searchParams.get('code');
       const {tokens} = await oauth2Client.getToken(code);
       console.log('\n=== YOUR REFRESH TOKEN ===');
       console.log(tokens.refresh_token);
       console.log('=========================\n');
       res.end('You can close this window now.');
       process.exit(0);
     }
   }).listen(3000, () => {
     console.log('Listening on http://localhost:3000');
   });
   ```

   Run it:
   ```bash
   node get-refresh-token.js
   ```

   - Open the URL, authorize with your Google account
   - Copy the refresh token that prints

---

## Step 3: Deploy Backend to Render

1. **Create a new Web Service on Render**:
   - Go to https://render.com and sign in
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `cascadia-booking-backend`
     - **Region**: Choose closest to you
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Runtime**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free tier is fine

2. **Add Environment Variables** (in Render dashboard):
   ```
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=https://cascadia-booking-backend.onrender.com/auth/google/callback
   GOOGLE_REFRESH_TOKEN=your_refresh_token
   FRONTEND_URL=https://cascadiatechpartners.github.io
   PORT=3000
   ```

3. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your Render URL (e.g., `https://cascadia-booking-backend.onrender.com`)

---

## Step 4: Update Frontend Configuration

1. **Update `booking.js`**:
   ```javascript
   const BACKEND_URL = 'https://cascadia-booking-backend.onrender.com';
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_actual_key_here';
   ```

2. **Update `booking-success.js`**:
   ```javascript
   const BACKEND_URL = 'https://cascadia-booking-backend.onrender.com';
   ```

3. **Commit and push to GitHub**:
   ```bash
   git add booking.js booking-success.js
   git commit -m "Configure booking system backend URL"
   git push
   ```

---

## Step 5: Add Navigation Link

Update `nav.html` to include a "Book Consultation" link:

```html
<a href="booking.html">Book Consultation</a>
```

---

## Step 6: Test the Booking Flow

1. **Navigate to your site**: https://cascadiatechpartners.github.io
2. **Click "Book Consultation"**
3. **Fill in your information**
4. **Select a date and time slot**
5. **Complete payment** (use Stripe test card: 4242 4242 4242 4242)
6. **Verify**:
   - Check your email for Stripe receipt
   - Check your Google Calendar for the event

---

## Local Development

To test locally:

```bash
cd backend
cp .env.example .env
# Edit .env with your keys
npm install
npm run dev
```

The backend will run at `http://localhost:3000`.

Update `booking.js` to use `http://localhost:3000` for testing.

---

## Going Live

When ready for production:

1. **Update Stripe to live mode**:
   - Use live API keys in Render environment variables
   - Update `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`

2. **Update Google OAuth**:
   - Update redirect URI in Google Cloud Console to production URL
   - Update `GOOGLE_REDIRECT_URI` in Render

3. **Update frontend URLs**:
   - Point `BACKEND_URL` to production Render URL
   - Update `FRONTEND_URL` in Render to your custom domain

---

## Troubleshooting

### "No available time slots"
- Check that your Google Calendar is connected
- Verify business hours in `server.js` (default: 9 AM - 5 PM)
- Check timezone settings

### Payment fails
- Verify Stripe keys are correct
- Check Stripe Dashboard for error details
- Ensure frontend URL is allowed in Stripe Dashboard

### Calendar events not created
- Check Render logs for errors
- Verify Google refresh token is valid
- Ensure Calendar API is enabled

---

## Files Structure

```
cascadiatechpartners.github.io/
├── booking.html           # Booking page
├── booking-success.html   # Success confirmation page
├── booking.js             # Booking page JavaScript
├── booking-success.js     # Success page JavaScript
└── backend/
    ├── server.js          # Express API server
    ├── package.json       # Dependencies
    └── .env.example       # Environment variables template
```

---

## Support

For issues or questions:
- Check Render logs: https://dashboard.render.com
- Stripe Dashboard: https://dashboard.stripe.com
- Google Cloud Console: https://console.cloud.google.com
