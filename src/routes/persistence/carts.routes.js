import {
  createCart,
  physicalDeleteCart,
  physicalDeleteProductById,
  physicalDeleteProducts,
  readCartById,
  readCarts,
  updateCart,
} from "../../controllers/carts.controller.js";
import { Router } from "express";

const router = Router();

router.post("/v3/carts", createCart);

router.get("/v3/carts", readCarts);

router.get("/v3/carts/:cid", readCartById);

router.post("/v3/carts/:cid/product/:pid", updateCart);

router.delete("/v3/carts/:cid", physicalDeleteCart);

router.delete("/v3/carts/:cid/products", physicalDeleteProducts);

router.delete("/v3/carts/:cid/products/:pid", physicalDeleteProductById);

export default router;
