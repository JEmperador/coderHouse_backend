import { getLocaleTime, isValidPassword, createHash } from "../../helpers/utils.js";
import CartManager from "./cartManager.js";

const cartManager = new CartManager();

class UserManager {
  constructor() {
    this.users = [];
  }
  _getNextId = () => {
    const count = this.users.length;
    const nextId = count > 0 ? this.users[count - 1].id + 1 : 1;

    return nextId;
  };

  createUser = async (user) => {
    try {
      const users = await this.readUsers();

      const cart = await cartManager.createCart();

      const newUser = {
        id: this._getNextId(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        password: createHash(user.password),
        cartId: cart.id,
        social: "Local",
        role: user.email == "adminCoder@coder.com" ? "admin" : "user",
      };

      if (!user.first_name || !user.last_name || !user.email || !user.age) {
        console.log(`All fields are required - ${getLocaleTime()}`);
        throw new Error("All fields are required");
      }

      if (users.find((user) => user.email === newUser.email)) {
        console.log(
          `Email ${newUser.email} is already in use - ${getLocaleTime()}`
        );
        throw new Error(`Email ${newUser.email} is already in use`);
      }

      users.push(newUser);

      console.log(`User created - ${getLocaleTime()}`);
      return newUser;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  readUsers = async () => {
    try {
      const users = this.users;

      return users;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  readUserByEmail = async (email) => {
    try {
      const users = await this.readUsers();
      const user = Object.values(users).find((u) => u.email === email);

      if (user === undefined) {
        console.log(`Not found User - ${getLocaleTime()}`);
        throw new Error("Not found User");
      }

      console.log(user);
      return user;
    } catch (err) {
      throw err;
    }
  };

  readUserValid = async (email, password) => {
    try {
      const users = await this.readUsers();
      const user = Object.values(users).find((u) => u.email === email);

      if (!user) {
        console.log("Invalid credentials");
        throw new Error("Invalid credentials");
      }

      if (!isValidPassword(password, user)) {
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
      const users = await this.readUsers();

      const ix = await users.findIndex((user) => user.email === email);

      if (ix === -1) {
        console.log(`Email ${email} not exists - ${getLocaleTime()}`);
        throw new Error(`Email ${email} not exists`);
      }

      const user = await this.readUserByEmail(email);

      const samePassword = isValidPassword(password, user);

      if (samePassword) {
        console.log(`Same password - ${getLocaleTime()}`);
        throw new Error("Same password");
      }

      const newPassword = createHash(password);

      Object.assign(users[ix], { password: newPassword });

      const reUser = await this.readUserByEmail(email);

      console.log(`Password reset - ${getLocaleTime()}`);
      return reUser;
    } catch (err) {
      throw err;
    }
  };
}

export default UserManager;
