import mongoose, { Schema, Document, Types } from "mongoose";

// 1. Define the TypeScript interface
export interface ProductType {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  composition?: string;
  dosage?: string;
  indications?: string[];
  category?: string;
  imageUrl?: string;
  quantity?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the Mongoose schema
const productSchema = new Schema<ProductType>(
  {
    name: { type: String, required: true },
    description: String,
    composition: String,
    dosage: String,
    indications: [String],
    category: String,
    imageUrl: String,
    quantity: String,
  },
  {
    timestamps: true,
  }
);

// 3. Export the model
const Product =
  mongoose.models.Product ||
  mongoose.model<ProductType>("Product", productSchema);

export default Product;
