import Cart from "../src/dao/mongoDB/cartManager.js";
import Product from "../src/dao/mongoDB/productManager.js";
import { assert, expect } from "../src/configs/test.config.js";
import mongoose from "mongoose";

describe("Testing Carts DAO", () => {
  before(function () {
    this.cartsDAO = new Cart();
    this.productsDAO = new Product();
  });

  // Si lo descomento se pisa entre paso y paso
  // beforeEach(function () {
  //   mongoose.connection.collections.products.drop();

  //   mongoose.connection.collections.carts.drop();
  // });

  it("Create Cart", async function () {
    this.timeout(5000);
    const result = await this.cartsDAO.createCart();

    // assert.ok(result._id);
    expect(result).to.have.property("_id");
  });

  it("Read Carts", async function () {
    this.timeout(5000);
    const result = await this.cartsDAO.readCarts();

    // assert.strictEqual(Array.isArray(result), true);
    // expect(result).to.be.deep.equal([]);
    expect(Array.isArray(result)).to.be.true;
  });

  it("Read Cart by id", async function () {
    this.timeout(5000);

    const result = await this.cartsDAO.createCart();

    const cart = await this.cartsDAO.readCartById(result._id);

    // assert.strictEqual(typeof user, "object");
    expect(cart).to.have.property("_id");
  });

  it("Read amount Cart by id", async function () {
    this.timeout(5000);

    const result = await this.cartsDAO.createCart();

    const amount = await this.cartsDAO.readCartAmountById(result._id);

    // assert.strictEqual(typeof user, "object");
    // expect(amount).to.be.above(0);
    // expect(amount).to.be.equal(0);
    expect(amount).to.be.a('number');
  });

  it("Update Cart", async function () {
    this.timeout(5000);

    const cart = await this.cartsDAO.createCart();

    let mockProduct = {
      title: "Algo",
      description: "muy interesante",
      price: 999,
      thumbnail: "",
      code: "algo_unico_y_diferente_definitivo",
      stock: 1,
      category: "CPU",
      owner: "admin",
    };

    let mockQuantity = 1

    const product = await this.productsDAO.createProduct(mockProduct);

    const updateCart = await this.cartsDAO.updateCart(
      cart._id,
      product._id,
      mockQuantity
    );

    expect(updateCart).to.be.an('object');
  });

  it("Delete physical Cart", async function () {
    this.timeout(5000);

    const cart = await this.cartsDAO.createCart();

    const physicalDeleteCart = await this.cartsDAO.physicalDeleteCart(
      cart._id
    );

    // expect(updateProduct).to.not.have.property("_id");
    expect(physicalDeleteCart).to.equal(true);
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });
});
