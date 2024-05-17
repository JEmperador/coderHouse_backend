import CartService from "../../services/cart.service.js";
import { Router } from "express";
import { passportCall } from "../../helpers/middlewares.js";
import {
  gmailTransport,
  outlookTransport,
  getTransport,
} from "../../configs/transport.config.js";

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

    const result = await transport.sendMail({
      from: "Atlas Tech <javier_emperador@outlook.com>",
      to: `${buyer}`,
      subject: "Congratulations on your purchase",
      html: `<h1>Congratulations</h1>
              <p>Yor ticket id: ${ticketId}<p/>`,
    });

    console.log("front", result);

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
