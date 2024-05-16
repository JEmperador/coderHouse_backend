import TicketService from "../services/ticket.service.js";

const ticketService = new TicketService();

export const createTicket = async (req, res) => {
  const { amount, purchaser } = req.body;

  try {
    await ticketService.createTicket({ amount, purchaser });

    res.status(201).json("Ticket created successfully");
  } catch (err) {
    if (err.message.includes("All fields")) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const readTickets = async (req, res) => {
  try {
    const tickets = await ticketService.readTickets();

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logicalDeleteTicket = async (req, res) => {
  const { tid } = req.params;
  try {
    let result = await ticketService.logicalDeleteTicket(tid);

    res.status(200).json(`Ticket with id: ${tid} was removed`);
  } catch (err) {
    if (err.message.includes("Invalid ticket")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};
