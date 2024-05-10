import { getLocaleTime } from "../../helpers/utils.js";

class CartManager {
  constructor() {
    this.carts = [];
  }

  _getNextId = () => {
    const count = this.carts.length;
    const nextId = count > 0 ? this.carts[count - 1].id + 1 : 1;

    return nextId;
  };

  createCart = async () => {
    try {
      const carts = await this.readCarts();

      const cart = {
        id: this._getNextId(),
        products: [],
      };

      carts.push(cart);

      console.log(`Cart created successfully - ${getLocaleTime()}`);
      return carts;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  readCarts = async () => {
    try {
      const carts = this.carts;

      return carts;
    } catch (err) {
      console.log(err);
      return [];
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

  updateCart = async (idC, idP, quantity) => {
    try {
      const carts = await this.readCarts();
      const cart = carts.find((cart) => cart.id === Number(idC));

      if (cart === undefined) {
        console.log(`Not found Cart - ${getLocaleTime()}`);
        throw new Error("Not found Cart");
      }

      const productExist = cart.products.find(
        (product) => product.id === String(idP)
      );

      if (productExist !== undefined) {
        productExist.quantity += quantity;
      } else {
        cart.products.push({
          id: idP,
          quantity,
        });
      }

      return cart;
    } catch (err) {
        console.log(err);
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

      const newCarts = carts.filter((i) => i.id !== Number(id));
      this.carts = newCarts;

      console.log(`Cart removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
        console.log(err);
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

      console.log(`Product removed successfully - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default CartManager;
