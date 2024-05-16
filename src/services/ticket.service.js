import { ticketDAO } from "../dao/factory.js";

const dao = new ticketDAO();

class TicketService {
  createTicket = async (ticket) => {
    const newTicket = await dao.createTicket(ticket);

    return "Ticket was created successfully";
  };

  readTickets = async () => {
    const tickets = await dao.readTickets();

    return tickets;
  };

  logicalDeleteTicket = async (idT) => {
    const logicalDeletedTicket = await dao.logicalDeleteTicket(idT);

    return "Ticket removed";
  };
}

export default TicketService;
