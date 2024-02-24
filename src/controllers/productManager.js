import fs from "fs";
import {
  getNextId,
  getLocaleTime,
  createFile,
  saveData,
  readData,
} from "../utils.js";

class ProductManager {
  static #path = "./mock/products.json";
  constructor() {
    this.products = [];
    ProductManager.#path;
  }

  addProduct = async (
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) => {
    try {
      const fileExist = fs.existsSync(ProductManager.#path);

      if (!fileExist) {
        await createFile(ProductManager.#path);
      }

      const products = await this.getProducts();

      const product = {
        id: getNextId(ProductManager.#path),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status: stock > 0 ? true : false,
      };

      if (
        !title ||
        !description ||
        !price ||
        !code ||
        stock === undefined ||
        !category
      ) {
        console.log(`All fields are required - ${getLocaleTime()}`);
        return false;
      }

      if (products.find((product) => product.code === code)) {
        console.log(
          `Product with code ${
            product.code
          } already exists - ${getLocaleTime()}`
        );
        return undefined;
      }

      products.push(product);
      await saveData(products, ProductManager.#path);

      console.log(`Product was loaded successfully - ${getLocaleTime()}`);

      const Reproducts = await this.getProducts();

      return Reproducts;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  getProducts = async () => {
    try {
      const fileExist = fs.existsSync(ProductManager.#path);

      if (!fileExist) {
        await createFile(ProductManager.#path);

        console.log(`[] - ${getLocaleTime()}`);

        return undefined;
      }

      const products = await readData(ProductManager.#path);

      if (products.length < 1) {
        console.log(`[] - ${getLocaleTime()}`);

        return undefined;
      }

      return products;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  getProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const product = Object.values(products).find((i) => i.id === id);

      if (product === undefined) {
        console.log(`Not found - ${getLocaleTime()}`);
        return undefined;
      }

      console.log(product);
      return product;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  updateProduct = async (id, props) => {
    try {
      const products = await this.getProducts();

      const ix = await products.findIndex((product) => product.id === id);

      if (ix === -1) {
        console.log(`Product does not exist - ${getLocaleTime()}`);
        return undefined;
      }

      if (props.hasOwnProperty("id") || props.hasOwnProperty("code")) {
        console.log(
          `Cannot update 'id' or 'code' property - ${getLocaleTime()}`
        );
        return false;
      }

      Object.assign(products[ix], props);
      const updatedProduct = products[ix];
      updatedProduct.stock === 0
        ? (updatedProduct.status = false)
        : (updatedProduct.status = true);
      await saveData(products, ProductManager.#path);

      console.log(updatedProduct);
      return updatedProduct;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  deleteProduct = async (id) => {
    try {
      let products = await this.getProducts();

      const product = Object.values(products).find((i) => i.id === id);

      if (product === undefined) {
        console.log(`Product does not exist - ${getLocaleTime()}`);
        return undefined;
      }

      products = products.filter((i) => i.id !== id);
      const save = await saveData(products, ProductManager.#path);

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export default ProductManager;
