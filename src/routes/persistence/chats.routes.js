import {
  createMessage,
  logicalDeleteMessage,
  physicalDeleteMessage,
  readMessages,
  updateMessage,
} from "../../controllers/chats.controller.js";
import { Router } from "express";

const router = Router();

router.post("/v3/chats", createMessage);

router.get("/v3/chats", readMessages);

router.put("/v3/chats/:mid", updateMessage);

router.delete("/v3/chats/physical/:mid", physicalDeleteMessage);

router.delete("/v3/chats/logical/:mid", logicalDeleteMessage);

export default router;
