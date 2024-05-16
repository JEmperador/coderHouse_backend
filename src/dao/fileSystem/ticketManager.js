import { v4 as uuidv4 } from "uuid";
import {
  getLocaleTime,
  getLocaleDateTime,
  getNextId,
  saveData,
  createFile,
  readData,
} from "../../helpers/utils.js";

class TicketManager {
  static #path = "./mock/tickets.json";
  constructor() {
    this.tickets = [];
    TicketManager.#path;
  }

  createTicket = async (ticket) => {
    try {
      const fileExist = fs.existsSync(TicketManager.#path);

      if (!fileExist) {
        await createFile(TicketManager.#path);
      }

      if (!ticket.amount || !ticket.purchaser) {
        console.log(`All fields are required - ${getLocaleTime()}`);
        throw new Error("All fields are required");
      }

      const tickets = await this.readTickets();

      const newTicket = {
        id: getNextId(),
        code: uuidv4(),
        amount: ticket.amount,
        purchaser: ticket.purchaser,
        purchase_datetime: getLocaleDateTime(),
        status: true,
      };

      tickets.push(newTicket);
      await saveData(tickets, TicketManager.#path);

      return true;
    } catch (err) {
      throw err;
    }
  };

  readTickets = async () => {
    try {
      const fileExist = fs.existsSync(TicketManager.#path);

      if (!fileExist) {
        await createFile(TicketManager.#path);
      }

      const tickets = await readData(TicketManager.#path);

      return tickets;
    } catch (err) {
      console.log(`[] - ${getLocaleTime()}`);
      return err;
    }
  };

  logicalDeleteTicket = async (idT) => {
    try {
      let tickets = await this.readTickets();

      const ticketIdx = Object.values(tickets).findIndex(
        (i) => i.id === Number(idT)
      );

      if (ticketIdx === -1) {
        console.log(`Not found Ticket - ${getLocaleTime()}`);
        throw new Error("Not found Ticket");
      }

      tickets[ticketIdx].status = false;
      const save = await saveData(tickets, TicketManager.#path);

      console.log(`Ticket removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default TicketManager;
