import ChatService from "../services/chat.service.js";

const chatService = new ChatService();

export const createMessage = async (req, res, next) => {
  const { user, message } = req.body;

  try {
    await chatService.createMessage({ user, message });

    res.status(201).json("Message created successfully");
  } catch (err) {
    next(err);
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

export const updateMessage = async (req, res, next) => {
  const { mid } = req.params;
  const props = req.body;

  try {
    const updatedMessage = await chatService.updateMessage(mid, props);

    res.status(200).json(updatedMessage);
  } catch (err) {
    next(err);
  }
};

export const physicalDeleteMessage = async (req, res, next) => {
  const { mid } = req.params;
  try {
    let result = await chatService.physicalDeleteMessage(mid);

    res.status(200).json(`Message with id: ${mid} was removed`);
  } catch (err) {
    next(err);
  }
};

export const logicalDeleteMessage = async (req, res, next) => {
  const { mid } = req.params;
  try {
    let result = await chatService.logicalDeleteMessage(mid);

    res.status(200).json(`Message with id: ${mid} was removed`);
  } catch (err) {
    next(err);
  }
};
