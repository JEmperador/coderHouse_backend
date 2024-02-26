import fs from "fs";
import {
  getNextId,
  getLocaleTime,
  createFile,
  saveData,
  readData,
} from "../utils.js";
import ProductManager from "./productManager.js";

const productManager = new ProductManager();

class CartManager {
  static #path = "./mock/carts.json";
  constructor() {
    this.carts = [];
    CartManager.#path;
  }

  createCart = async () => {
    try {
      const fileExist = fs.existsSync(CartManager.#path);

      if (!fileExist) {
        await createFile(CartManager.#path);
      }

      const carts = await this.getCarts();

      const cart = {
        id: getNextId(CartManager.#path),
        products: [],
      };

      carts.push(cart);
      await saveData(carts, CartManager.#path);

      console.log(`Cart was loaded successfully - ${getLocaleTime()}`);
      return carts;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  getCarts = async () => {
    try {
      const fileExist = fs.existsSync(CartManager.#path);

      if (!fileExist) {
        await createFile(CartManager.#path);

        console.log(`[] - ${getLocaleTime()}`);

        return undefined;
      }

      const carts = readData(CartManager.#path);

      if (carts.length < 1) {
        console.log(`[] - ${getLocaleTime()}`);

        return undefined;
      }

      return carts;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const cart = Object.values(carts).find((i) => i.id === id);

      if (cart === undefined) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      return cart;
    } catch (err) {
      throw err;
    }
  };

  updateCart = async (idC, idP, quantity) => {
    try {
      const cart = await this.getCartById(idC);
      const product = await productManager.getProductById(idP);

      if (quantity > product.stock) {
        console.log(`Exceeds available stock - ${getLocaleTime()}`);
        throw new Error("Exceeds available stock");
      }

      const productExist = cart.products.find((product) => product.id === idP);

      if (productExist) {
        product.stock -= quantity;
        productExist.quantity += quantity;
      } else {
        product.stock -= quantity;
        cart.products.push({
          id: idP,
          quantity,
        });
      }

      const newStock = product.stock;
      const newStatus =
        newStock === 0 ? (product.status = false) : (product.status = true);

      await productManager.updateProduct(idP, {
        stock: newStock,
        status: newStatus,
      });
      await saveData(carts, CartManager.#path);

      return cart;
    } catch (err) {
      throw err;
    }
  };

  deleteCart = async (id) => {
    try {
      let carts = await this.getCarts();

      const cart = Object.values(carts).find((i) => i.id === id);

      if (cart === undefined) {
        console.log(`Cart does not exist - ${getLocaleTime()}`);
        throw new Error("Cart does not exist");
      }

      carts = carts.filter((i) => i.id !== id);
      await saveData(carts, CartManager.#path);

      console.log(`Cart removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default CartManager;
