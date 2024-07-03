import Product from "../src/dao/mongoDB/productManager.js";
import { assert, expect } from "../src/configs/test.config.js";
import mongoose from "mongoose";

describe("Testing Products DAO", () => {
  before(function () {
    this.productsDAO = new Product();
  });

  beforeEach(function () {
    mongoose.connection.collections.products.drop();
  });

  it("Create Product", async function () {
    this.timeout(5000);
    let mockProduct = {
      title: "Algo",
      description: "muy interesante",
      price: 999,
      thumbnail: "",
      code: "algo_unico_y_diferente",
      stock: 1,
      category: "CPU",
      owner: "admin",
    };

    const result = await this.productsDAO.createProduct(mockProduct);

    // assert.ok(result._id);
    expect(result).to.have.property("_id");
  });

  it("Create Product with the same code", async function () {
    this.timeout(5000);
    let mockProduct = {
      title: "Algo",
      description: "muy interesante",
      price: 999,
      thumbnail: "",
      code: "algo_unico_y_diferente",
      stock: 1,
      category: "CPU",
      owner: "admin",
    };

    try {
      await this.productsDAO.createProduct(mockProduct);
      await this.productsDAO.createProduct(mockProduct);
    } catch (error) {
      // assert.strictEqual(error.message, "Error when trying to create a product")
      expect(error.message).to.equal("Error when trying to create a product");
    }
  });

  it("Read Products", async function () {
    this.timeout(5000);
    const result = await this.productsDAO.readProducts();

    // assert.strictEqual(Array.isArray(result), true);
    // expect(result).to.be.deep.equal([]);
    expect(Array.isArray(result)).to.be.true;
  });

  it("Read Product by id", async function () {
    this.timeout(5000);
    let mockProduct = {
      title: "Algo",
      description: "muy interesante",
      price: 999,
      thumbnail: "",
      code: "algo_unico_y_diferente_2",
      stock: 1,
      category: "CPU",
      owner: "admin",
    };

    const result = await this.productsDAO.createProduct(mockProduct);

    const product = await this.productsDAO.readProductById(result._id);

    // assert.strictEqual(typeof user, "object");
    expect(product).to.have.property("_id");
  });

  it("Update Product", async function () {
    this.timeout(5000);
    let mockProduct = {
      title: "Algo",
      description: "muy interesante",
      price: 999,
      thumbnail: "",
      code: "algo_unico_y_diferente_3",
      stock: 1,
      category: "CPU",
      owner: "admin",
    };

    let props = {
      title: "Hola a",
      description: "todos",
      thumbnail: "https://picsum.photos/200",
    };

    const result = await this.productsDAO.createProduct(mockProduct);

    const updateProduct = await this.productsDAO.updateProduct(
      result._id,
      props
    );

    // assert.strictEqual(typeof user, "object");
    expect(updateProduct).to.have.property("_id");
  });

  it("Delete logical Product", async function () {
    this.timeout(5000);
    let mockProduct = {
      title: "Algo",
      description: "muy interesante",
      price: 999,
      thumbnail: "",
      code: "algo_unico_y_diferente_4",
      stock: 1,
      category: "CPU",
      owner: "admin",
    };

    const result = await this.productsDAO.createProduct(mockProduct);

    const logicaldeletedProduct = await this.productsDAO.logicalDeleteProduct(
      result._id
    );

    // expect(updateProduct).to.not.have.property("_id");
    expect(logicaldeletedProduct).to.equal(true);
  });

  it("Delete physical Product", async function () {
    this.timeout(5000);
    let mockProduct = {
      title: "Algo",
      description: "muy interesante",
      price: 999,
      thumbnail: "",
      code: "algo_unico_y_diferente_5",
      stock: 1,
      category: "CPU",
      owner: "admin",
    };

    const result = await this.productsDAO.createProduct(mockProduct);

    const logicaldeletedProduct = await this.productsDAO.physicalDeleteProduct(
      result._id
    );
    // expect(updateProduct).to.not.have.property("_id");
    expect(logicaldeletedProduct).to.equal(true);
  });

  it("Delete physical Product when not found product", async function () {
    this.timeout(5000);
    let productRandomId = "64a13f7b8f1c2e6b5f9d4567";

    try {
      const logicaldeletedProduct =
        await this.productsDAO.physicalDeleteProduct(productRandomId);
    } catch (error) {
      // assert.strictEqual(error.message, "Error when trying to delete a product")
      // expect(updateProduct).to.not.have.property("_id");
      expect(error.message).to.equal("Error when trying to delete a product");
    }
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });
});
