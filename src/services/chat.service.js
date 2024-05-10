import { chatDAO } from "../dao/factory.js";

const dao = new chatDAO();

class ChatService {
  createMessage = async (message) => {
    const newMessage = await dao.createMessage(message);

    return "Message was created successfully";
  };

  readMessages = async () => {
    const messages = await dao.readMessages();

    return messages;
  };

  updateMessage = async (idM, props) => {
    const updatedMessage = await dao.updateMessage(idM, props);

    return updatedMessage;
  };

  physicalDeleteMessage = async (idM) => {
    const physicalDeletedMessage = await dao.physicalDeleteMessage(idM);

    return "Message removed";
  };

  logicalDeleteMessage = async (idM) => {
    const logicalDeletedMessage = await dao.logicalDeleteMessage(idM);

    return "Message removed";
  };
}

export default ChatService;
