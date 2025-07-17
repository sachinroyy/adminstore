// // import { MongoClient } from 'mongodb';

// // if (!process.env.MONGODB_URI) {
// //   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// // }

// // const uri = process.env.MONGODB_URI;
// // const options = {
// //   serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
// //   socketTimeoutMS: 45000,
// //   connectTimeoutMS: 10000,
// //   maxPoolSize: 10,
// //   retryWrites: true,
// //   w: 'majority',
// //   ssl: true,
// //   sslValidate: true,
// //   // Add DNS resolution settings
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   // Add these options for better connection handling
// //   heartbeatFrequencyMS: 10000,
// //   retryReads: true,
// // };

// // let client;
// // let clientPromise;

// // if (process.env.NODE_ENV === 'development') {
// //   // In development mode, use a global variable to preserve the connection across module reloads
// //   if (!global._mongoClientPromise) {
// //     console.log('Creating new MongoDB client...');
// //     client = new MongoClient(uri, options);
// //     global._mongoClientPromise = client.connect();
// //   }
// //   clientPromise = global._mongoClientPromise;
// // } else {
// //   // In production mode, avoid using a global variable
// //   console.log('Creating new MongoDB client...');
// //   client = new MongoClient(uri, options);
// //   clientPromise = client.connect();
// // }

// // export async function connectDB() {
// //   try {
// //     console.log('Attempting to connect to MongoDB...');
// //     const client = await clientPromise;
// //     // Test the connection
// //     await client.db().command({ ping: 1 });
// //     console.log('Successfully connected to MongoDB');
// //     return client.db(); // This will use the database specified in the connection string
// //   } catch (error) {
// //     console.error('MongoDB connection error details:', {
// //       message: error.message,
// //       code: error.code,
// //       codeName: error.codeName,
// //       connectionString: uri ? `${uri.substring(0, uri.indexOf('@') + 1)}*****` : 'Not set'
// //     });
// //     throw new Error(`Failed to connect to the database: ${error.message}`);
// //   }
// // }

// // export { clientPromise };
// // lib/mongodb.js
// import { MongoClient } from 'mongodb';

// let cached = global.mongo || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const uri = process.env.MONGODB_URI;
//     const options = {};

//     if (!uri) throw new Error('Please define MONGODB_URI in .env.local');

//     cached.promise = MongoClient.connect(uri, options).then(client => {
//       return {
//         client,
//         db: client.db()  // default DB from URI
//       };
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }
// lib/mongodb.js
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
