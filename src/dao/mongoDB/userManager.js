import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../../helpers/utils.js";
import CartManager from "./cartManager.js";
import { getLocaleTime } from "../../helpers/utils.js";

const cartManager = new CartManager();

class UserManager {
  createUser = async (user) => {
    try {
      if (!user.first_name || !user.last_name || !user.email || !user.age) {
        console.log("All fields are required");
        throw new Error("All fields are required");
      }

      const validate = await UserModel.findOne({ email: user.email });

      if (validate) {
        console.log(
          `Email ${user.email} is already in use - ${getLocaleTime()}`
        );
        throw new Error(`Email ${user.email} is already in use`);
      }

      const cart = await cartManager.createCart();

      user.password = createHash(user.password);
      user.cartId = cart._id;
      user.role = user.email == "adminCoder@coder.com" ? "admin" : "user";

      const newUser = await UserModel.create(user);

      console.log(`User created - ${getLocaleTime()}`);
      return newUser;
    } catch (err) {
      throw err;
    }
  };

  readUsers = async () => {
    try {
      const users = await UserModel.find();

      return users;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  readUserByEmail = async (email) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        console.log(`User not exist - ${getLocaleTime()}`);
        throw new Error("User not exist");
      }

      return user;
    } catch (err) {
      throw err;
    }
  };

  readUserValid = async (email, password) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        console.log("Invalid credentials");
        throw new Error("Invalid credentials");
      } else if (!isValidPassword(password, user)) {
        console.log("Invalid password");
        throw new Error("Invalid password");
      }

      return user;
    } catch (err) {
      throw err;
    }
  };

  updateUserPassword = async (email, password) => {
    try {
      const user = await this.readUserByEmail(email);

      if (!user) {
        console.log(`Email ${email} not exists - ${getLocaleTime()}`);
        throw new Error(`Email ${email} not exists`);
      }

      const samePassword = isValidPassword(password, user);

      if (samePassword) {
        console.log(`Same password - ${getLocaleTime()}`);
        throw new Error("Same password");
      }

      const userId = user._id;

      const userNewPassword = await UserModel.findByIdAndUpdate(
        userId,
        {
          password: createHash(password),
        },
        {
          new: true,
        }
      );

      console.log(`Password reset - ${getLocaleTime()}`);
      return userNewPassword;
    } catch (err) {
      throw err;
    }
  };
}

export default UserManager;
