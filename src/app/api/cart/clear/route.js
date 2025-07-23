import { connectDB } from '../../../../lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { db } = await connectDB();
    
    // Clear the cart by setting items to empty array
    const result = await db.collection('cart').updateOne(
      { userId: session.user.id },
      {
        $set: { 
          items: [],
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'Cart is already empty' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Cart cleared successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
