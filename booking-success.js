// Booking success page JavaScript
const BACKEND_URL = 'http://localhost:3000'; // Update this after deployment

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  
  if (!sessionId) {
    document.getElementById('detailSessionId').textContent = 'No session found';
    document.getElementById('detailStatus').textContent = 'Error';
    return;
  }
  
  document.getElementById('detailSessionId').textContent = sessionId;
  
  // In a real implementation, you would verify the payment with your backend
  // For now, we'll just show a success message
  try {
    // You could add an endpoint to verify the payment status
    // const response = await fetch(`${BACKEND_URL}/api/verify-payment?session_id=${sessionId}`);
    // const data = await response.json();
    
    // For now, assume success and show confirmation
    document.getElementById('detailStatus').textContent = 'Confirmed ✓';
    document.getElementById('detailStatus').style.color = '#060';
    
    // Optionally call the confirm-booking endpoint if not done via webhook
    // await fetch(`${BACKEND_URL}/api/confirm-booking`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ sessionId, stripeSessionId: sessionId })
    // });
  } catch (error) {
    console.error('Error verifying payment:', error);
    document.getElementById('detailStatus').textContent = 'Pending verification';
  }
});
