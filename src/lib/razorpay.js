import Razorpay from 'razorpay';
import { loadScript } from './load-script';

const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

// Load Razorpay script dynamically
export async function loadRazorpay() {
  return loadScript('https://checkout.razorpay.com/v1/checkout.js');
}

// Initialize Razorpay payment
export async function initiateRazorpayPayment({ amount, currency = 'INR', orderId, name, description, prefill = {}, notes = {} }) {
  try {
    // Ensure Razorpay script is loaded
    await loadRazorpay();
    
    if (!window.Razorpay) {
      throw new Error('Razorpay SDK failed to load. Are you online?');
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: amount * 100, // Convert to paise
      currency,
      name: name || 'Your Store Name',
      description: description || 'Purchase from Your Store',
      order_id: orderId,
      handler: function (response) {
        // This will be handled by the component
        return response;
      },
      prefill: {
        name: prefill.name || '',
        email: prefill.email || '',
        contact: prefill.phone || '',
      },
      notes,
      theme: {
        color: '#2563eb',
      },
      modal: {
        ondismiss: function() {
          // Handle modal dismissal if needed
          return true;
        }
      },
    };

    const rzp = new window.Razorpay(options);
    return rzp;
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    throw error;
  }
}

// Verify payment signature
export function verifyPaymentSignature(orderId, paymentId, signature) {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(orderId + '|' + paymentId);
  const generatedSignature = hmac.digest('hex');
  return generatedSignature === signature;
}
