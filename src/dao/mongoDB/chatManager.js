import mongoose from "mongoose";
import { MessageModel } from "../models/message.model.js";
import { getLocaleTime } from "../../helpers/utils.js";

class ChatManager {
  createMessage = async (message) => {
    try {
      if (!message.user || !message.message) {
        console.log("All fields are required");
        throw new Error("All fields are required");
      }

      const chat = {
        user: message.user,
        message: message.message,
        hour: getLocaleTime(),
        status: true,
      };

      const newMessage = await MessageModel.create(chat);

      console.log(`Message saved - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  readMessages = async () => {
    try {
      const messages = await MessageModel.find();

      return messages;
    } catch (err) {
      console.log(`No messages - ${getLocaleTime()}`);
      return [];
    }
  };

  updateMessage = async (idM, props) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idM)) {
        console.log(`Invalid message ID - ${getLocaleTime()}`);
        throw new Error("Invalid message ID");
      }

      if (props.message.trim().length < 1) {
        console.log(`Message cannot be empty - ${getLocaleTime()}`);
        throw new Error("Message cannot be empty");
      }

      const newChat = await MessageModel.findByIdAndUpdate(idM, props, {
        new: true,
      });

      if (!newChat) {
        console.log(`Not found Chat - ${getLocaleTime()}`);
        throw new Error("Not found Chat");
      }

      return newChat;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteMessage = async (idM) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idM)) {
        console.log(`Invalid message ID - ${getLocaleTime()}`);
        throw new Error("Invalid message ID");
      }

      const messageDeleted = await MessageModel.findByIdAndDelete(idM);

      if (!messageDeleted) {
        console.log(`Not found Message - ${getLocaleTime()}`);
        throw new Error("Not found Message");
      }

      console.log(`Message removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  logicalDeleteMessage = async (idM) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(idM)) {
        console.log(`Invalid message ID - ${getLocaleTime()}`);
        throw new Error("Invalid message ID");
      }

      const updatedMessage = await MessageModel.findByIdAndUpdate(
        idM,
        { status: false },
        { new: true }
      );

      if (!updatedMessage) {
        console.log(`Not found Message - ${getLocaleTime()}`);
        throw new Error("Not found Message");
      }

      console.log(`Message removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default ChatManager;
