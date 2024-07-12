import { expect, requester } from "../../src/configs/test.config.js";

describe("Testing for Atlas Tech web app", () => {
    describe("Testing for Products: ", () => {
      it("Endpoint POST /api/v3/products", async () => {
        const mockProduct = {
          title: "Hola",
          description: "Como estas?",
          price: 0.5,
          thumbnail: "",
          code: "algo_unico_y_diferente_2",
          stock: 1,
          category: "CPU",
          owner: "",
        };
  
        const { statusCode, ok, _body } = await requester
          .post("/api/v3/products")
          .send(mockProduct);
  
        // expect(statusCode).to.be.equal(201);
        // expect(_body.status).to.be.equal("success");
        // expect(ok).to.be.true;
        expect(_body.payload).to.have.property("_id");
      });
  
      it("Endpoint GET /api/v3/products", async () => {
        const { statusCode, ok, _body } = await requester.get("/api/v3/products");
  
        // expect(statusCode).to.be.equal(200);
        // expect(_body.status).to.be.equal("success");
        // expect(ok).to.be.true;
        expect(_body.payload).to.be.an("array");
      });
  
      it("Endpoint GET /api/v3/products/:pid", async () => {
        const productId = "6685d39cd4000bd70225bbda" //AQUI COLOCAR UN ID YA EXISTENTE
        const { statusCode, ok, _body } = await requester.get(`/api/v3/products/${productId}`);
  
        // expect(statusCode).to.be.equal(200);
        // expect(_body.status).to.be.equal("success");
        // expect(ok).to.be.true;
        // expect(_body.payload).to.be.an("object");
        expect(_body.payload).to.have.property("title");
      });
    });
  });