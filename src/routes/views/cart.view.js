import CartService from "../../services/cart.service.js";
import { Router } from "express";
import passport from "passport";
import { passportCall } from "../../helpers/middlewares.js";

const cartService = new CartService();
const router = Router();

router.get(
  "/:cid",
  passportCall("jwt"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { cid } = req.params;

    try {
      const cart = await cartService.readCartById(cid);

      res.render("cart", {
        title: "Atlas Tech | Cart",
        cart: cart,
        req: req,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

export default router;
