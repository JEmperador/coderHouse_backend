import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const enumCategories = ["CPU", "GPU", "PSU", "RAM", "MOTHER"];

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: String,
  code: { type: String, unique: true, index: true, required: true },
  stock: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  category: { type: String, index: true, enum: enumCategories, required: true },
  status: Boolean,
  owner: { type: String, required: true, default: "admin" },
});

productSchema.plugin(mongoosePaginate);

mongoose.set("strictQuery", false);

export const ProductModel = mongoose.model(productsCollection, productSchema);
