import CartManager from "../controllers/cartManager.js";
import { Router } from "express";

const cartManager = new CartManager();
const router = Router();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json("New Cart created");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;

  try {
    const updatedCart = await cartManager.updateCart(
      Number(cid),
      Number(pid),
      quantity
    );

    if (updatedCart === undefined) {
      res.status(404).json("Not found");
    } else {
      res.status(200).json("Product was added correctly");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartManager.getCartById(Number(cid));

    if (cart === undefined) {
      res.status(404).json("Not found");
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartManager.deleteCart(Number(cid));

    if (cart === undefined) {
      res.status(404).json("Not found");
    } else {
      res.status(200).json(`Cart with id: ${cid} was removed`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
