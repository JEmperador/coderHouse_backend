import dotenv from "dotenv";
import mongoose from "mongoose";
import configSwitch from "../configs/switch.config.js";
const { mongo_user, mongo_pass, mongo_cluster, mongo_app, mongo_db } =
  configSwitch;

dotenv.config();

const url = `mongodb+srv://${mongo_user}:${mongo_pass}@${mongo_cluster}.mongodb.net/?retryWrites=true&w=majority&appName=${mongo_app}`;

class MongoDB {
  static #instance;
  constructor() {
    mongoose.connect(url, {
      dbName: mongo_db,
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
