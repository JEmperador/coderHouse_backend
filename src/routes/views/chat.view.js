import { Router } from "express";
import ChatManager from "../../dao/mongoDB/chatManager.js";

const router = Router();
const chatManager = new ChatManager();

router.get("/", async (req, res) => {
  const messages = await chatManager.getMessages();
  res.render("chat", { messages });
});

export default router;
