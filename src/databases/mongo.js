import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const url = `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASS}@${process.env.DB_MONGO_CLUSTER}.6hohxmy.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_MONGO_APP}`;

class MongoDB {
  static #instance;
  constructor() {
    mongoose.connect(url, {
      dbName: process.env.DB_MONGO_DB,
    });
  }

  static getInstance = () => {
    if (this.#instance) {
      console.log("Already connected to MongoDB");
      return this.#instance;
    }

    this.#instance = new MongoDB();

    console.log("Connected to MongoDB successfully.");
    return this.#instance;
  };
}

export default MongoDB.getInstance();
