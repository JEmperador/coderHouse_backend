import { getLocaleTime } from "../../helpers/utils.js";

class ProductManager {
  constructor() {
    this.products = [];
  }

  _getNextId = () => {
    const count = this.products.length;
    const nextId = count > 0 ? this.products[count - 1].id + 1 : 1;

    return nextId;
  };

  createProduct = async (product) => {
    try {
      const products = await this.readProducts();

      const newProduct = {
        id: this._getNextId(),
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

      console.log(`Product was loaded successfully - ${getLocaleTime()}`);

      const Reproducts = await this.readProducts();

      return true;
    } catch (err) {
      throw err;
    }
  };

  readProducts = () => {
    try {
      const products = this.products;

      return products;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  readProductById = async (idP) => {
    console.log(idP);
    try {
      const products = this.readProducts();
      console.log(products);
      const product = Object.values(products).find((i) => i.id === Number(idP));

      console.log(product);

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

      const newProducts = products.filter((i) => i.id !== Number(id));
      this.products = newProducts

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  logicalDeleteProduct = async (id) => {
    try {
      let products = await this.readProducts();

      const productIdx = Object.values(products).findIndex(
        (i) => i.id === Number(id)
      );

      if (productIdx === -1) {
        console.log(`Not found Product - ${getLocaleTime()}`);
        throw new Error("Not found Product");
      }

      products[productIdx].status = false;

      console.log(`Product removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default ProductManager;
