import ProductManager from "../controllers/productManager.js";
import { Router } from "express";

const productManager = new ProductManager();
const router = Router();

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await productManager.getProductById(Number(pid));

    res.render("product", product);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
