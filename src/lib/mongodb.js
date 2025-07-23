
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let cached = global.mongo || { conn: null, promise: null };

export async function connectDB() {
  // Return cached connection if available
  if (cached.conn) return cached.conn;

  // If not cached, create a new connection promise
  if (!cached.promise) {
    if (!uri) throw new Error('Please define MONGODB_URI in .env.local');

    const client = new MongoClient(uri, options);
    cached.promise = client.connect().then(client => {
      return {
        client,
        db: client.db() // You can optionally specify db name here: client.db('your-db-name')
      };
    });
  }

  // Wait for the connection to resolve
  cached.conn = await cached.promise;
  return cached.conn;
}

// Cache for hot reload in development
global.mongo = cached;
