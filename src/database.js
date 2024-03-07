import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.DB_MONGO_URL;

mongoose.connect(url, {
  dbName: process.env.DB_MONDO_DB,
});

export const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "MongoDB connection error:"));
mongodb.once("open", () => console.log("Connected to MongoDB successfully."));

process.on("SIGINT", () => {
  mongodb.close(() => {
    console.log("Conexión a MongoDB cerrada.");
    process.exit(0);
  });
});
