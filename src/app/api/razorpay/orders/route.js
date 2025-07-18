import Razorpay from 'razorpay';

// Initialize Razorpay client
function getRazorpayClient() {
  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error('Missing Razorpay credentials in environment variables');
    console.log('NEXT_PUBLIC_RAZORPAY_KEY_ID:', process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? '***' : 'Not set');
    console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '***' : 'Not set');
    throw new Error('Payment service configuration error: Missing Razorpay credentials');
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    return razorpay;
  } catch (error) {
    console.error('Failed to create Razorpay client:', error.message);
    throw new Error(`Payment service initialization failed: ${error.message}`);
  }
}

export async function POST(request) {
  console.log('Received request to create Razorpay order');
  
  try {
    const razorpay = getRazorpayClient();

    const requestBody = await request.json().catch(() => {
      throw new Error('Invalid JSON in request body');
    });
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const { amount, currency = 'INR', notes } = requestBody;
    
    // Validate amount
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return Response.json(
        { error: 'A valid positive amount is required' },
        { status: 400 }
      );
    }

    // Convert amount to paise (smallest currency unit for INR)
    const amountInPaise = Math.round(amountNum * 100);
    
    const options = {
      amount: amountInPaise,
      currency,
      receipt: `order_${Date.now()}`,
      payment_capture: 1, // auto capture payment
      notes: notes || {}
    };

    console.log('Creating Razorpay order with options:', {
      ...options,
      amount: `${amountInPaise} (${amountNum} ${currency})`
    });
    
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order.id);
    
    return Response.json({
      success: true,
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      receipt: order.receipt,
    });
    
  } catch (error) {
    console.error('Razorpay order creation error:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    return Response.json(
      { 
        success: false,
        error: error.message || 'Failed to create payment order',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: error.statusCode || 500 }
    );
  }
}
