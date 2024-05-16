import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = createTransport({
  service: process.env.SERVICE_NODEMAILER,
  port: process.env.PORT_NODEMAILER,
  auth: {
    user: process.env.USER_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});

export default transport;