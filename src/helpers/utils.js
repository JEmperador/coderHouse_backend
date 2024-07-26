import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/user.model.js";
import { hashSync, compareSync, genSaltSync } from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { faker } from "@faker-js/faker";

dotenv.config();

//Bcrypt
export const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

export const isValidPassword = (password, user) => {
  return compareSync(password, user.password);
};

//Passport
export const serializeUser = (user, done) => {
  done(null, user._id);
};

export const deserializeUser = async (id, done) => {
  const user = await UserModel.findById({ _id: id });
  done(null, user);
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[process.env.COOKIE];
  }
  return token;
};

//FS
export function getNextId(path) {
  const data = fs.readFileSync(path);
  const products = JSON.parse(data);

  const count = products.length;
  const nextId = count > 0 ? products[count - 1].id + 1 : 1;

  return nextId;
}

export async function createFile(path) {
  try {
    await fs.promises.access(path);
  } catch (error) {
    await fs.promises.writeFile(path, "[]");

    console.log(`File created successfully - ${getLocaleTime()}`);
  }
}

export async function saveData(data, path) {
  try {
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(err);
  }
}

export async function readData(path) {
  try {
    const data = await fs.promises.readFile(path, "utf-8");
    const products = JSON.parse(data);
    return products;
  } catch (err) {
    console.log(err);
  }
}

//Handlebars
export const cookieExists = (req, options) => {
  if (req?.cookies[process.env.COOKIE]) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};

//General
export const getLocaleTime = () => {
  const time = new Date().toLocaleTimeString();
  return time;
};

export const getLocaleDateTime = () => {
  const dateTime = new Date().toLocaleString();
  return dateTime;
};

export const generateRandomNumber = () => {
  const randomNumber = Math.floor(10000 + Math.random() * 90000).toString();

  return randomNumber;
};

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

//JWT
export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_JWT, { expiresIn: "2h" });

  return token;
};

export const emailTokenExtractor = async (val) => {
  let email = "";

  jwt.verify(val, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      console.log("Nop, tkn invalido");
      return;
    }

    email = decoded.user.email;
  });

  return email;
};

//Socket
export const socketUserName = (cookiesSocket) => {
  let userName = null;

  if (cookiesSocket.length > 0) {
    const token = cookiesSocket.split("cookieTokenParzival=")[1];
    const decodeToken = jwt.decode(token);
    userName = decodeToken.user.email;
  }

  return userName;
};

//Nodemailer
export const emailSenderPurchase = async (transport, email, ticket) => {
  const mailOptions = {
    from: "Atlas Tech <javier_emperador@outlook.com>",
    to: `${email}`,
    subject: "Congratulations on your purchase",
    html: `<h1>Congratulations</h1>
          <p>Yor ticket id: ${ticket}<p/>`,
  };

  try {
    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const emailSenderResetPassword = async (
  transport,
  email,
  token,
  number
) => {
  const PORT = process.env.PORT ? `:${process.env.PORT}` : ""

  const mailOptions = {
    from: "Atlas Tech <javier_emperador@outlook.com>",
    to: `${email}`,
    subject: "Password reset request",
    html: `<h1>Password reset request</h1>
          <p>You will be prompted for the following code to reset your password</p>
          <h1>${number}</h1>
          <p>If you did not request to reset your password, please ignore this email.</p>
          <a href="${process.env.API_BASE_URL}${PORT}/afterResetRequest/${token}">Reset your password</a>`,
  };

  try {
    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const emailSenderDeleteProduct = async (
  transport,
  email,
  product,
) => {
  const mailOptions = {
    from: "Atlas Tech <j4v1113r@gmail.com>",
    to: `${email}`,
    subject: "Product deleted",
    html: `<h1>Product deleted</h1>
          <p>Product: <b>${product.title}</b> with code: <b>${product.code}</b> was deleted</p>`,
  };

  try {
    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const emailSenderDeleteUser = async (
  transport,
  email,
) => {
  const mailOptions = {
    from: "Atlas Tech <j4v1113r@gmail.com>",
    to: `${email}`,
    subject: "User deleted",
    html: `<h1>User deleted</h1>
          <p>Your user was deleted by the admin</p>`,
  };

  try {
    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const emailSenderUpdateRoleUser = async (
  transport,
  email,
) => {
  const mailOptions = {
    from: "Atlas Tech <j4v1113r@gmail.com>",
    to: `${email}`,
    subject: "Update role",
    html: `<h1>Update role</h1>
          <p>Your user was updated role by the admin</p>`,
  };

  try {
    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (err) {
    console.log(err);
  }
};

//Faker
const categories = ["CPU", "GPU", "PSU", "RAM", "MOTHER"];

const getRandomCategory = () => {
  return categories[Math.floor(Math.random() * categories.length)];
};

export const productGenerator = () => {
  const stock = faker.number.int({ min: 0, max: 100 });

  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.image.urlPicsumPhotos(),
    code: faker.string.uuid(),
    stock: stock,
    category: getRandomCategory(),
    status: stock > 0,
  };
};
