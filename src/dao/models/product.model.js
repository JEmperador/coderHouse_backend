import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: Array,
  code: String,
  stock: Number,
  category: String,
  status: Boolean,
});

mongoose.set("strictQuery", false);

export const ProductModel = mongoose.model(productsCollection, productSchema);
