import ProductService from "../../services/product.service.js";
import { Router } from "express";
import { passportCall } from "../../helpers/middlewares.js";

const productService = new ProductService();
const router = Router();

router.get("/", passportCall("jwt"), async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await productService.readProducts(limit);

    res.render("productsAdmin", {
      title: "Atlas Tech | Products",
      products: products,
      req: req,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
