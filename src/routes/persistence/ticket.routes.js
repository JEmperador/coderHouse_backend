import { Router } from "express";
import {
  createTicket,
  readTickets,
  logicalDeleteTicket,
} from "../../controllers/ticket.controller.js";

const router = Router();

router.post("/v3/tickets", createTicket);

router.get("/v3/tickets", readTickets);

router.delete("/v3/tickets/logical/:tid", logicalDeleteTicket);

export default router;
