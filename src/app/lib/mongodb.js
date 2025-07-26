import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("❌ Please add your MongoDB URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse the global variable in development
  if (!global._mongoClientPromise) {
    console.log("🔌 Connecting to MongoDB (dev)...");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  } else {
    console.log("✅ Reusing MongoDB connection (dev)");
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Create a new client in production
  console.log("🔌 Connecting to MongoDB (prod)...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
