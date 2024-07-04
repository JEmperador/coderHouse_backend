import { expect, requester } from "../../src/configs/test.config.js";

describe("Testing for Atlas Tech web app", () => {
  describe("Testing for User register: ", () => {
    it("Endpoint POST /api/v3/register", async () => {
      let mockUser = {
        first_name: "Leonel",
        last_name: "Messi",
        email: "leonel_elmaskpo@gmail.com",
        age: 36,
        password: "1234",
        social: "Local",
        role: "admin",
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/v3/register")
        .send(mockUser);

      expect(_body.status).to.equal("success");
      expect(_body.message).to.be.equal("Successful register");
      expect(_body.token).to.be.a("string");
    });
  });

  describe("Testing for User login: ", () => {
    it("Endpoint POST /api/v3/login", async () => {
      let mockUser = {
        email: "leonel_elmaskpo@gmail.com",
        password: "1234",
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/v3/login")
        .send(mockUser);

      expect(_body.status).to.equal("success");
      expect(_body.message).to.be.equal("Successful login");
      expect(_body.token).to.be.a("string");
    });
  });

  /* describe("Testing for User reset password: ", () => {
    it("Endpoint POST /api/v3/reset", async () => {
      let mockUser = {
        email: "leonel_elmaskpo@gmail.com",
        password: "4321",
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/v3/reset")
        .send(mockUser);

      console.log(_body);

      expect(_body.status).to.equal("success");
      expect(_body.message).to.be.equal("Successful reset password");
      expect(_body.token).to.be.a("string");
    });
  }); */

  describe("Testing for User logout: ", () => {
    it("Endpoint POST /api/v3/logout", async () => {
      const { statusCode, ok, _body } = await requester.get("/api/v3/logout");

      expect(_body.status).to.equal("failure");
      expect(_body.message).to.be.equal("Not logged in");
    });
  });
});
