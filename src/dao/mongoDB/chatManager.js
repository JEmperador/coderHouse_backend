import { MessageModel } from "../models/message.model.js";

class ChatManager {
  saveMessage = async (message) => {
    try {
      const newMessage = await MessageModel.create(message);

      console.log("Message saved");
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  getMessages = async () => {
    try {
      const messages = await MessageModel.find();

      return messages;
    } catch (err) {
      console.log("No messages");
      return [];
    }
  };
}

export default ChatManager;
