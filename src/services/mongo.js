import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const url = `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASS}@${process.env.DB_MONGO_CLUSTER}.6hohxmy.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_MONGO_APP}`;

mongoose.connect(url, {
  dbName: process.env.DB_MONDO_DB,
});

export const mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "MongoDB connection error:"));
mongodb.once("open", () => console.log("Connected to MongoDB successfully."));

process.on("SIGINT", () => {
  mongodb.close(() => {
    console.log("Connection to MongoDB closed");
    process.exit(0);
  });
});
