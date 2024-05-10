import fs from "fs";
import {
  getNextId,
  getLocaleTime,
  createFile,
  saveData,
  readData,
} from "../../helpers/utils.js";

class ProductManager {
  static #path = "./mock/products.json";
  constructor() {
    this.products = [];
    ProductManager.#path;
  }

  createProduct = async (
    product
  ) => {
    try {
      const fileExist = fs.existsSync(ProductManager.#path);

      if (!fileExist) {
        await createFile(ProductManager.#path);
      }

      const products = await this.readProducts();

      const newProduct = {
        id: getNextId(ProductManager.#path),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
        status: product.stock > 0 ? true : false,
      };

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        product.stock === undefined ||
        !product.category
      ) {
        console.log(`All fields are required - ${getLocaleTime()}`);
        throw new Error("All fields are required");
      }

      if (products.find((product) => product.code === newProduct.code)) {
        console.log(
          `Product with code ${
            product.code
          } already exists - ${getLocaleTime()}`
        );
        throw new Error(`Product with code ${product.code} already exists`);
      }

      products.push(newProduct);
      await saveData(products, ProductManager.#path);

      console.log(`Product was loaded successfully - ${getLocaleTime()}`);

      const Reproducts = await this.readProducts();

      return true;
    } catch (err) {
      throw err;
    }
  };

  readProducts = async () => {
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

  readProductById = async (id) => {
    try {
      const products = await this.readProducts();
      const product = Object.values(products).find((i) => i.id === Number(id));

      if (product === undefined) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      console.log(product);
      return product;
    } catch (err) {
      throw err;
    }
  };

  updateProduct = async (id, props) => {
    try {
      const products = await this.readProducts();

      const ix = await products.findIndex(
        (product) => product.id === Number(id)
      );

      if (ix === -1) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      if (props.hasOwnProperty("id") || props.hasOwnProperty("code")) {
        console.log(
          `Cannot update 'id' or 'code' property - ${getLocaleTime()}`
        );
        throw new Error("Cannot update 'id' or 'code' property");
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
      throw err;
    }
  };

  physicalDeleteProduct = async (id) => {
    try {
      let products = await this.readProducts();

      const product = Object.values(products).find((i) => i.id === Number(id));

      if (product === undefined) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      products = products.filter((i) => i.id !== Number(id));
      const save = await saveData(products, ProductManager.#path);

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  logicalDeleteProduct = async (id) => {
    try {
      let products = await this.readProducts();

      const productIdx = Object.values(products).findIndex((i) => i.id === Number(id));

      if (productIdx === -1) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      products[productIdx].status = false;
      const save = await saveData(products, ProductManager.#path);

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default ProductManager;
