import session from "express-session";
import MongoStore from "connect-mongo";
import { mongodb } from "../services/mongo.js";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_CONNECT_MONGO;

const sessions = session({
  /* secret: secret,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASS}@${process.env.DB_MONGO_CLUSTER}.6hohxmy.mongodb.net/${process.env.DB_MONGO_DB}?retryWrites=true&w=majority`,
    ttl: 100,
  }), */
  secret: "secret",
  resave: true,
  saveUninitialized: true,
});

export default sessions;
