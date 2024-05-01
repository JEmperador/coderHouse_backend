import { Router } from "express";
import ChatService from "../../services/chat.service.js";
import passport from "passport";
import { passportCall } from "../../helpers/middlewares.js";

const router = Router();
const chatService = new ChatService();

router.get(
  "/",
  passportCall("jwt"),
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const messages = await chatService.readMessages();

    res.render("chat", {
      title: "Atlas Tech | Chat",
      messages: messages,
      req: req,
    });
  }
);

export default router;
