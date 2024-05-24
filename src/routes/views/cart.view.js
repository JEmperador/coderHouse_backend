import CartService from "../../services/cart.service.js";
import { Router } from "express";
import { passportCall } from "../../helpers/middlewares.js";
import { getTransport } from "../../configs/transport.config.js";
import { emailSender } from "../../helpers/utils.js";

const cartService = new CartService();
const router = Router();

router.get("/:cid", passportCall("jwt"), async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartService.readCartById(cid);

    const amount = await cartService.readCartAmountById(cid);

    cart.amount = amount;

    res.render("cart", {
      title: "Atlas Tech | Cart",
      cart: cart,
      req: req,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:cid/purchase", passportCall("jwt"), async (req, res) => {
  const { cid } = req.params;

  try {
    const user = req.user.user;

    const buyer = user.email;

    const ticket = await cartService.createPurchase({ cid, buyer });

    const ticketId = ticket._id;

    const transport = getTransport(buyer);

    await emailSender(transport, buyer, ticketId);

    res.render("purchase", {
      title: "Atlas Tech | Checkout",
      ticket: ticket,
      req: req,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
