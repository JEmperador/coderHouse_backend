import {
  createProduct,
  logicalDeleteProduct,
  physicalDeleteProduct,
  readProductById,
  readProducts,
  updateProduct,
} from "../../controllers/products.controller.js";
import { Router } from "express";

const router = Router();

router.post("/v3/products", createProduct);

router.get("/v3/products", readProducts);

router.get("/v3/products/:pid", readProductById);

router.put("/v3/products/:pid", updateProduct);

router.delete("/v3/products/physical/:pid", physicalDeleteProduct);

router.delete("/v3/products/logical/:pid", logicalDeleteProduct);

export default router;
