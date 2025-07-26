import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    composition: String,
    dosage: String,
    indications: [String], // array of strings
    category: String,
    imageUrl: String,
  },
  { timestamps: true }
);

// Avoid recompiling model during hot reloads
const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
