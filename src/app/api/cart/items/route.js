import { connectDB } from '../../../../lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { ObjectId } from 'mongodb';

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { productId, quantity } = await request.json();
    const db = await connectDB();

    // Validate product ID
    if (!productId || !ObjectId.isValid(productId)) {
      return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate quantity
    if (typeof quantity !== 'number' || quantity < 1) {
      return new Response(JSON.stringify({ error: 'Invalid quantity' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update the cart item quantity
    const result = await db.collection('cart').findOneAndUpdate(
      { 
        userId: session.user.id,
        'items.productId': productId
      },
      {
        $set: { 
          'items.$.quantity': quantity,
          updatedAt: new Date() 
        }
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return new Response(JSON.stringify({ error: 'Cart item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate totals
    const cart = result.value;
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return new Response(JSON.stringify({
      ...cart,
      totalItems,
      totalPrice
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { productId } = await request.json();
    const db = await connectDB();

    // Validate product ID
    if (!productId || !ObjectId.isValid(productId)) {
      return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Remove item from cart
    const result = await db.collection('cart').findOneAndUpdate(
      { userId: session.user.id },
      {
        $pull: { 
          items: { productId: productId }
        },
        $set: { 
          updatedAt: new Date() 
        }
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return new Response(JSON.stringify({ error: 'Cart not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate totals
    const cart = result.value;
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return new Response(JSON.stringify({
      ...cart,
      totalItems,
      totalPrice
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
