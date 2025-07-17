import { connectDB } from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[id]/../../api/auth/[...nextauth]/route"; // Adjust the path as necessary
 
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await connectDB();
    const orders = await db
      .collection('orders')
      .find({ 'user.id': session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { items, total, shippingAddress } = await request.json();
    const db = await connectDB();

    // Create order
    const order = {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
      items,
      total,
      shippingAddress,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert order
    const result = await db.collection('orders').insertOne(order);
    order._id = result.insertedId;

    // Clear user's cart
    await db.collection('cart').deleteOne({ userId: session.user.id });

    return new Response(JSON.stringify(order), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
