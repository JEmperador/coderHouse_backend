import ChatService from "../services/chat.service.js";

const chatService = new ChatService();

export const createMessage = async (req, res) => {
  const { user, message } = req.body;

  try {
    await chatService.createMessage({ user, message });

    res.status(201).json("Message created successfully");
  } catch (err) {
    if (err.message.includes("All fields")) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const readMessages = async (req, res) => {
  try {
    const messages = await chatService.readMessages();

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateMessage = async (req, res) => {
  const { mid } = req.params;
  const props = req.body;

  try {
    const updatedMessage = await chatService.updateMessage(mid, props);

    res.status(200).json(updatedMessage);
  } catch (err) {
    if (err.message.includes("Invalid message")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Message cannot")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(400).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const physicalDeleteMessage = async (req, res) => {
  const { mid } = req.params;
  try {
    let result = await chatService.physicalDeleteMessage(mid);

    res.status(200).json(`Message with id: ${mid} was removed`);
  } catch (err) {
    if (err.message.includes("Invalid message")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};

export const logicalDeleteMessage = async (req, res) => {
  const { mid } = req.params;
  try {
    let result = await chatService.logicalDeleteMessage(mid);

    res.status(200).json(`Message with id: ${mid} was removed`);
  } catch (err) {
    if (err.message.includes("Invalid message")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Not found")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
};
