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
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { productId, quantity, name, price, image } = body || {};

    if (!productId) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const qty = parseInt(quantity, 10);
    if (Number.isNaN(qty) || qty < 0) {
      return new Response(JSON.stringify({ error: 'Invalid quantity' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { db } = await connectDB();

    const cartCollection = db.collection('cart');
    let cart = await cartCollection.findOne({ email: session.user.email });

    // Create cart if missing
    if (!cart) {
      cart = {
        userId: session.user.id,
        name: session.user.name,
        email: session.user.email,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const insertRes = await cartCollection.insertOne(cart);
      cart._id = insertRes.insertedId;
    }

    // Find item index supporting string, number, or ObjectId storage
    const pidStr = typeof productId === 'string' ? productId : String(productId);
    const pidObj = ObjectId.isValid(pidStr) ? new ObjectId(pidStr) : null;

    const findIndex = (arr) =>
      arr.findIndex((it) =>
        it.productId === productId ||
        it.productId === pidStr ||
        (pidObj && String(it.productId) === String(pidObj))
      );

    const idx = Array.isArray(cart.items) ? findIndex(cart.items) : -1;

    if (qty === 0) {
      // Robust removal in DB using $pull so it matches both string and ObjectId stored ids
      const pullValues = [pidStr];
      if (pidObj) pullValues.push(pidObj);
      await cartCollection.updateOne(
        { _id: cart._id },
        {
          $pull: { items: { productId: { $in: pullValues } } },
          $set: { updatedAt: new Date() }
        }
      );
    } else {
      if (idx >= 0) {
        // Update existing quantity
        cart.items[idx].quantity = qty;
      } else {
        // Add as new item with provided or default fields
        cart.items.push({
          productId: productId,
          name: name || 'Unnamed Product',
          price: parseFloat(price) || 0,
          image: image || null,
          quantity: qty,
          addedAt: new Date(),
        });
      }
    }

    // If qty>0 and we modified the local array, persist it
    if (qty > 0) {
      await cartCollection.updateOne(
        { _id: cart._id },
        { $set: { items: cart.items, updatedAt: new Date() } }
      );
    }

    // Re-read for accurate state
    const result = await cartCollection.findOne({ _id: cart._id });

    // Calculate totals
    const updated = result || {};
    const totalItems = (updated.items || []).reduce(
      (sum, item) => sum + parseInt(item.quantity, 10),
      0
    );
    const totalPrice = (updated.items || []).reduce(
      (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity, 10),
      0
    );

    return new Response(
      JSON.stringify({
        items: updated.items || [],
        totalItems,
        totalPrice,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error updating cart item:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


