import { Router } from "express";
import ChatManager from "../controllers/chatManager.js";

const router = Router();
const chatManager = new ChatManager();

router.get("/", async (req, res) => {
  const messages = await chatManager.getMessasges();
  res.render("chat", { messages });
});

export default router;
