import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Validate environment variables
if (!process.env.RAZORPAY_KEY_SECRET) {
  console.error('Missing Razorpay key secret in environment variables');
  throw new Error('Payment verification configuration error: Missing RAZORPAY_KEY_SECRET');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Create the expected signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(orderId + '|' + paymentId);
    const generatedSignature = hmac.digest('hex');

    const isSignatureValid = generatedSignature === signature;

    if (isSignatureValid) {
      // Here you would typically:
      // 1. Update your database to mark the order as paid
      // 2. Send confirmation email
      // 3. Update inventory, etc.
      
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        paymentId,
        orderId
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid payment signature',
          details: 'The payment signature could not be verified.'
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to verify payment',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
      { status: 500 }
    );
  }
}
