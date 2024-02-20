import CartManager from "../controllers/cartManager.js";
import { Router } from "express";
const cartManager = new CartManager();
const router = Router();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartManager.getCartById(Number(cid));

    res.render("cart", cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
