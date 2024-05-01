import dotenv from "dotenv";
import UserService from "../services/user.service.js";
import { generateToken } from "../helpers/utils.js";

dotenv.config();

const userService = new UserService();

export const register = async (req, res) => {
  const { first_name, last_name, email, age, password, social, role } =
    req.body;

  try {
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password,
      social,
      role,
    };

    const result = await userService.createUser(newUser);

    res.redirect("/");
  } catch (err) {
    if (err.message.includes("All fields")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Email")) {
      res.status(404).json(err.message);
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userValid = await userService.readUserValid(email, password);

    const loginUser = {
      first_name: userValid.first_name,
      last_name: userValid.last_name,
      email: userValid.email,
      age: userValid.age,
      password: "",
      cartId: userValid.cartId,
      social: userValid.social,
      role: userValid.role,
    };

    const token = generateToken(loginUser);

    res.cookie(process.env.COOKIE, token, {
      maxAge: 60 * 60 * 2000,
      httpOnly: true,
    });

    res.redirect("/profile");
  } catch (err) {
    if (err.message.includes("Invalid credentials")) {
      res.status(401).json(err.message);
    } else if (err.message.includes("Invalid password")) {
      res.status(401).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const reset = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.readUserValid(email, password);

    const newUserPassword = await userService.updateUserPassword(
      email,
      password
    );

    const resetPassword = {
      first_name: newUserPassword.first_name,
      last_name: newUserPassword.last_name,
      email: newUserPassword.email,
      cartId: newUserPassword.cartId,
      social: newUserPassword.social,
      role: newUserPassword.role,
    };

    const tokenUser = generateToken(resetPassword);

    res.cookie(process.env.COOKIE, tokenUser, {
      maxAge: 60 * 60 * 2000,
      httpOnly: true,
    });

    res.redirect("/profile");
  } catch (err) {
    if (err.message.includes("Email")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Same password")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("User")) {
      res.status(401).json(err.message);
    } else if (err.message.includes("Email")) {
      res.status(401).json(err.message);
    } else if (err.message.includes("Same")) {
      res.status(401).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const logout = async (req, res) => {
  if (req?.cookies[process.env.COOKIE]) {
    res.clearCookie(process.env.COOKIE, { secure: true });

    res.status(200).redirect("/");
  } else {
    res.status(400).json({ status: "failure", message: "Not logged in" });
  }
};
