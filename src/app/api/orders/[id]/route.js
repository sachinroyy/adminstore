import { connectDB } from "../../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[id]/../../../api/auth/[...nextauth]/route"; // Adjust the path as necessary
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid order ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await connectDB();
    const order = await db.collection('orders').findOne({
      _id: new ObjectId(id),
      'user.id': session.user.id
    });

    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(order), {
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

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid order ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { status } = await request.json();
    if (!status) {
      return new Response(JSON.stringify({ error: 'Status is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await connectDB();
    const result = await db.collection('orders').findOneAndUpdate(
      {
        _id: new ObjectId(id),
        'user.id': session.user.id
      },
      {
        $set: {
          status,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return new Response(JSON.stringify({ error: 'Order not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(result.value), {
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
