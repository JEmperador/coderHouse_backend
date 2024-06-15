import mongoose from "mongoose";

const usersCollections = "users";

const enumSocial = ["Local", "GitHub", "Google"];
const enumRole = ["user", "admin"];

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  social: {
    type: String,
    enum: enumSocial,
    default: "Local",
  },
  role: {
    type: String,
    enum: enumRole,
    default: "user",
  },
  resetToken: {
    token: String,
    expiresAt: Date,
  },
});

mongoose.set("strictQuery", false);

export const UserModel = mongoose.model(usersCollections, userSchema);
