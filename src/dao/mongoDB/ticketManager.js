import { TicketModel } from "../../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";
import { getLocaleTime } from "../../helpers/utils.js";
import mongoose from "mongoose";

class TicketManager {
  createTicket = async (ticket) => {

    try {
      if (!ticket.amount || !ticket.purchaser) {
        console.log(`All fields are required - ${getLocaleTime()}`);
        throw new Error("All fields are required");
      }

      const newTicket = {
        code: uuidv4(),
        amount: ticket.amount,
        purchaser: ticket.purchaser,
        status: true,
      };

      const result = await TicketModel.create(newTicket);

      console.log(`Ticket saved - ${getLocaleTime()}`);
      return result;
    } catch (err) {
      throw err;
    }
  };

  readTickets = async () => {
    try {
      const tickets = await TicketModel.find();

      return tickets;
    } catch (err) {
      console.log(`No tickets - ${getLocaleTime()}`);
      return [];
    }
  };

  logicalDeleteTicket = async (idT) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idT)) {
        console.log(`Invalid ticket ID - ${getLocaleTime()}`);
        throw new Error("Invalid ticket ID");
      }

      const updatedTicket = await TicketModel.findByIdAndUpdate(
        idT,
        { status: false },
        { new: true }
      );

      if (!updatedTicket) {
        console.log(`Not found Ticket - ${getLocaleTime()}`);
        throw new Error("Not found Ticket");
      }

      console.log(`Ticket removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default TicketManager;
