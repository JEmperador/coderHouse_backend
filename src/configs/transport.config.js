import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const gmailTransport = createTransport({
  service: process.env.SERVICE_GOOGLE_NODEMAILER,
  port: process.env.PORT_GOOGLE_NODEMAILER,
  auth: {
    user: process.env.USER_GOOGLE_NODEMAILER,
    pass: process.env.PASS_GOOGLE_NODEMAILER,
  },
});

const outlookTransport = createTransport({
  service: process.env.SERVICE_MICROSOFT_NODEMAILER,
  port: process.env.PORT_MICROSOFT_NODEMAILER,
  auth: {
    user: process.env.USER_MICROSOFT_NODEMAILER,
    pass: process.env.PASS_MICROSOFT_NODEMAILER,
  },
});

const getTransport = (email) => {
  if (email.includes("@gmail.com")) {
    return gmailTransport;
  } else if (email.includes("@outlook.com") || email.includes("@hotmail.com")) {
    return outlookTransport;
  } else {
    throw new Error("Unsupported email service");
  }
};

export { gmailTransport, outlookTransport, getTransport };
