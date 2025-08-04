import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    composition: String,
    dosage: String,
    indications: [String], // keep it as an array in DB
    category: String,
    imageUrl: String,
    quantity: String, // ✅ NEW FIELD
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
