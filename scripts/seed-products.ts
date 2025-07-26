import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "@/models/product";
import products from "./products.json";

// Load .env.local instead of default .env
dotenv.config({ path: ".env.local" });

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in .env.local");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Existing products deleted");

    await Product.insertMany(products);
    console.log("New products inserted");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
