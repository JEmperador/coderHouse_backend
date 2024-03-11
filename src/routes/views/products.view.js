import ProductManager from "../../dao/mongoDB/productManager.js";
import { Router } from "express";
const productManager = new ProductManager();
const router = Router();

router.get("/realtimeproducts", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts(limit);
  res.render("realtimeproducts", {
    title: "Atlas Tech | Products",
    products: products,
  });
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await productManager.getProductById(pid);

    product.title = `Atlas Tech | ${product.title}`

    res.render("product", product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts(limit);

    res.render("products", {
      title: "Atlas Tech | Products",
      products: products,
    });
  } catch (err) {
    res.status(400).json("Bad Request");
  }
});

export default router;
