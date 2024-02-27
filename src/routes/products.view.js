import ProductManager from "../controllers/productManager.js";
import { Router } from "express";
const productManager = new ProductManager();
const router = Router();

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtimeproducts", { products: products });
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await productManager.getProductById(Number(pid));

    res.render("product", product);
  } catch (err) {
    res.status(500).json(err);
  }
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
