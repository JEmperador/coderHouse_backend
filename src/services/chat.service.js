import ChatManager from "../dao/mongoDB/chatManager.js";

const chatManager = new ChatManager();

class ChatService {
  createMessage = async (message) => {
    const newMessage = await chatManager.createMessage(message);

    return "Message was created successfully";
  };

  readMessages = async () => {
    const messages = await chatManager.readMessages();

    return messages;
  };

  updateMessage = async (idM, props) => {
    const updatedMessage = await chatManager.updateMessage(idM, props);

    return updatedMessage;
  };

  physicalDeleteMessage = async (idM) => {
    const physicalDeletedMessage = await chatManager.physicalDeleteMessage(idM);

    return "Message removed";
  };

  logicalDeleteMessage = async (idM) => {
    const logicalDeletedMessage = await chatManager.logicalDeleteMessage(idM);

    return "Message removed";
  }
}

export default ChatService;
