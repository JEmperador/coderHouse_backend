import fs from "fs";
import {
  getNextId,
  getLocaleTime,
  createFile,
  saveData,
  readData,
} from "../../helpers/utils.js";
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

      const carts = await this.readCarts();

      const cart = {
        id: getNextId(CartManager.#path),
        products: [],
      };

      carts.push(cart);
      await saveData(carts, CartManager.#path);

      console.log(`Cart created successfully - ${getLocaleTime()}`);
      return carts;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  readCarts = async () => {
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

  readCartById = async (id) => {
    try {
      const carts = await this.readCarts();
      const cart = Object.values(carts).find((i) => i.id === Number(id));

      if (cart === undefined) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      return cart;
    } catch (err) {
      throw err;
    }
  };

  readCartAmountById = async (idC) => {
    try {
      const cart = await this.readCartById(idC);

      if (!cart) {
        console.error(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      const products = cart.products;

      if (!Object.keys(products).length > 0) {
        console.error(`Cart is empty - ${getLocaleTime()}`);
        throw new Error("Cart is empty");
      }

      const total = 0;

      products.forEach((product) => {
        total += product.product.price;
      });

      console.log(`Cart amount: $${total} - ${getLocaleTime()}`);
      return total;
    } catch (err) {
      throw err;
    }
  };

  updateCart = async (idC, idP, quantity) => {
    try {
      const carts = await this.readCarts();
      const cart = carts.find((cart) => cart.id === Number(idC));

      if (cart === undefined) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      const product = await productManager.readProductById(Number(idP));

      if (quantity > product.stock) {
        console.log(`Exceeds available stock - ${getLocaleTime()}`);
        throw new Error("Exceeds available stock");
      }

      const productExist = cart.products.find(
        (product) => product.id === Number(idP)
      );

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

      await productManager.updateProduct(Number(idP), {
        stock: newStock,
        status: newStatus,
      });
      await saveData(carts, CartManager.#path);

      return cart;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteCart = async (id) => {
    try {
      let carts = await this.readCarts();

      const cart = Object.values(carts).find((i) => i.id === Number(id));

      if (cart === undefined) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      carts = carts.filter((i) => i.id !== Number(id));
      await saveData(carts, CartManager.#path);

      console.log(`Cart removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteProducts = async (id) => {
    try {
      let carts = await this.readCarts();

      const cart = Object.values(carts).find((i) => i.id === Number(id));

      if (cart === undefined) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      if (cart.products.length === 0) {
        console.log(`Cart is already empty - ${getLocaleTime()}`);
        throw new Error("Cart is already empty");
      }

      cart.products = [];
      await saveData(carts, CartManager.#path);

      console.log(`Cart was emptied - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteProductById = async (idC, idP) => {
    try {
      let carts = await this.readCarts();

      const cart = Object.values(carts).find((i) => i.id === Number(idC));

      if (cart === undefined) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      const productIndex = Object.values(cart.products).findIndex(
        (i) => i.id === idP
      );

      if (productIndex === -1) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      cart.products.splice(productIndex, 1);

      await saveData(carts, CartManager.#path);

      console.log(`Product removed successfully - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default CartManager;
