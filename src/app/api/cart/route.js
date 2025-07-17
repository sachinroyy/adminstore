import { connectDB } from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ 
        error: 'Authentication required',
        message: 'Please sign in to view your cart'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const userEmail = session.user.email;

    const { db } = await connectDB();
    const cart = await db.collection('cart').findOne({ email: userEmail });

    if (!cart) {
      return new Response(JSON.stringify({ 
        items: [], 
        total: 0,
        message: 'No cart found for this user'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate total price
    const total = cart.items?.reduce((sum, item) => 
      sum + (parseFloat(item.price) * parseInt(item.quantity)), 0) || 0;

    return new Response(JSON.stringify({
      items: cart.items || [],
      total: total.toFixed(2),
      lastUpdated: cart.updatedAt
    }), {
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
    
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ 
        error: 'Authentication required',
        message: 'Please sign in to manage your cart'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const userEmail = session.user.email;

    const requestData = await request.json();
    console.log('Received cart data:', requestData);
    
    const { productId, quantity = 1, name, price, image } = requestData;
    
    if (!productId) {
      return new Response(JSON.stringify({ 
        error: 'Product ID is required',
        receivedData: requestData
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { db } = await connectDB();
    const cartCollection = db.collection('cart');
    
    // Find the user's cart by email
    let cart = await cartCollection.findOne({ email: userEmail });
    
    // Ensure we have a valid image URL
    const imageUrl = image || null;
    
    const product = {
      productId: productId,
      name: name || 'Unnamed Product',
      price: parseFloat(price) || 0,
      image: imageUrl,
      quantity: Math.max(1, parseInt(quantity, 10)),
      addedAt: new Date()
    };
    
    console.log(`Processing cart item for user: ${userEmail}`, product);

    if (!cart) {
      // Create new cart if it doesn't exist
      const newCart = {
        userId: session.user.id,
        name: session.user.name,
        email: userEmail,
        items: [product],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await cartCollection.insertOne(newCart);
      cart = await cartCollection.findOne({ _id: result.insertedId });
    } else {
      // Check if product already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (existingItemIndex >= 0) {
        // Update quantity if product exists
        cart.items[existingItemIndex].quantity += parseInt(quantity, 10);
      } else {
        // Add new product to cart
        cart.items.push(product);
      }

      // Update cart in database
      await cartCollection.updateOne(
        { _id: cart._id },
        {
          $set: {
            items: cart.items,
            updatedAt: new Date()
          }
        }
      );
    }

    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
