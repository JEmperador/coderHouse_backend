import User from "../src/dao/mongoDB/userManager.js";
import { assert, expect } from "../src/configs/test.config.js";
import mongoose from "mongoose";

describe("Testing Users DAO", () => {
  before(function () {
    this.usersDAO = new User();
  });

  beforeEach(function () {
    mongoose.connection.collections.users.drop();
  });

  it("Read Users from DB", async function () {
    this.timeout(5000);
    const result = await this.usersDAO.readUsers();

    //assert.strictEqual(Array.isArray(result), true);
    //expect(result).to.be.deep.equal([]);
    expect(Array.isArray(result)).to.be.true;
  });

  it("Create User on DB", async function () {
    this.timeout(5000);
    let mockUser = {
      first_name: "Leonel",
      last_name: "Messi",
      email: "leonel_elmaskpo@gmail.com",
      age: 36,
      password: "1234",
    };

    const result = await this.usersDAO.createUser(mockUser);

    //assert.ok(result._id);
    expect(result).to.have.property("_id");
  });

  it("Read User by email", async function () {
    this.timeout(5000);
    let email = "leonel_elmaskpo@gmail.com";

    const user = await this.usersDAO.readUserByEmail(email);

    //assert.strictEqual(typeof user, "object");
    expect(user).to.be.an("object");
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });
});
