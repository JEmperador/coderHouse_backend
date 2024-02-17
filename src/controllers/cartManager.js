import fs from "fs";

class CartManager {
  static #path = "./mock/carts.json";
  constructor() {
    this.carts = [];
    CartManager.#path;
  }

  _getNextId = () => {
    const data = fs.readFileSync(CartManager.#path);
    const carts = JSON.parse(data);

    const count = carts.length;
    const nextId = count > 0 ? carts[count - 1].id + 1 : 1;

    return nextId;
  };

  _getLocaleTime = () => {
    const time = new Date().toLocaleTimeString();
    return time;
  };

  _createFile = async () => {
    try {
      await fs.promises.access(CartManager.#path);
    } catch (error) {
      await fs.promises.writeFile(CartManager.#path, "[]");

      console.log(`File created successfully.`);
    }
  };

  _saveData = async (data) => {
    try {
      await fs.promises.writeFile(
        CartManager.#path,
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.log(err);
    }
  };

  _readData = async () => {
    try {
      const data = await fs.promises.readFile(CartManager.#path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      console.log(err);
    }
  };

  createCart = async () => {
    const carts = await this.getCarts();

    try {
      const cart = {
        id: this._getNextId(),
        products: [],
      };

      carts.push(cart);
      await this._saveData(carts);

      console.log(`Cart was loaded successfully - ${this._getLocaleTime()}`);
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
        await this._createFile();

        console.log(`[] - ${this._getLocaleTime()}`);
        return undefined;
      }

      const carts = await this._readData();

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
        console.log(`Not found - ${this._getLocaleTime()}`);
        return undefined;
      } else {
        console.log(cart);
        return cart;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  updateCart = async (idC, idP, quantity) => {
    try {
      const carts = await this.getCarts();

      const cart = await carts.find((cart) => cart.id === idC);

      if (cart === undefined) {
        console.log(`Not found - ${this._getLocaleTime()}`);

        return undefined;
      }

      const produtExist = cart.products.find((product) => product.id === idP);

      if (produtExist) {
        produtExist.quantity += quantity;
      } else {
        cart.products.push({
          id: idP,
          quantity,
        });
      }

      await this._saveData(carts);

      return cart;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  deleteCart = async (id) => {
    try {
      let carts = await this.getCarts();

      const cart = Object.values(carts).find((i) => i.id === id);

      if (cart !== undefined) {
        carts = carts.filter((i) => i.id !== id);
        const save = await this._saveData(carts);

        console.log(`Cart removed - ${this._getLocaleTime()}`);
        return true;
      } else {
        console.log(`Cart does not exist - ${this._getLocaleTime()}`);
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export default CartManager;
