import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    default: [],
  },
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});

export const CartModel = mongoose.model(cartsCollection, cartSchema);
