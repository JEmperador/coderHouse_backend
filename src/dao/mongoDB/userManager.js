import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../../helpers/utils.js";
import { getLocaleTime } from "../../helpers/utils.js";

class UserManager {
  createUser = async (user) => {
    try {
      console.log(user);
      const validate = await UserModel.findOne({ email: user.email });

      if (validate) {
        console.log(`Email ${user.email} already exists - ${getLocaleTime()}`);
        throw new Error(`Email ${user.email} already exists`);
      }

      const newUser = await UserModel.create(user);

      console.log(`User created - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  getUsers = async () => {
    try {
      const users = await UserModel.find();

      return users;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  getUserByEmail = async (email) => {
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

  updatePassword = async (email, password) => {
    try {
      const user = await UserModel.findOne({ email });

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

      const userNewPassword = await UserModel.findByIdAndUpdate(userId, {
        password: createHash(password),
      });

      console.log(`Password reset - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default UserManager;
