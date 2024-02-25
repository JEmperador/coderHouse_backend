import ProductManager from "../controllers/productManager.js";
import { Router } from "express";
const productManager = new ProductManager();
const router = Router();

router.get("/upload", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("upload", { products: products });
});

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    if (!limit || limit < 1) {
      res.render("products", {
        products: products,
      });
    } else {
      const limitedProducts = products.slice(0, limit);
      res.render("products", {
        products: limitedProducts,
      });
    }
  } catch (err) {
    res.status(400).json("Bad Request");
  }
});

export default router;
