import dotenv from "dotenv";
import program from "../helpers/commander.js";

const { mode } = program.opts();

dotenv.config({
  path: mode === "prod" ? "./.env.prod" : "./.env.dev",
});

const configSwitch = {
  mongo_user: process.env.DB_MONGO_USER,
  mongo_pass: process.env.DB_MONGO_PASS,
  mongo_cluster: process.env.DB_MONGO_CLUSTER,
  mongo_app: process.env.DB_MONGO_APP,
  mongo_db: process.env.DB_MONGO_DB,
  persistence: process.env.PERSISTENCE || "mongo",
};

export default configSwitch;
