import mongoose from "mongoose";
import { MessageModel } from "../../models/message.model.js";
import { getLocaleTime } from "../../helpers/utils.js";
import CustomError from "../../helpers/errors/custom-error.js";
import {
  generateFieldChatErrorInfo,
  generateInvalidIdChatErrorInfo,
  generateNotFoundChatErrorInfo,
  generateMessageEmptyChatErrorInfo,
} from "../../helpers/errors/info.js";
import { Errors } from "../../helpers/errors/enum.js";

class ChatManager {
  createMessage = async (message) => {
    try {
      if (!message.user || !message.message) {
        console.log("All fields are required");
        throw CustomError.createError({
          name: "All fields are required",
          cause: generateFieldChatErrorInfo(message),
          message: "Error when trying to create a chat",
          code: Errors.ALL_FIELD_REQUIRED,
        });
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
        throw CustomError.createError({
          name: "Invalid chat ID",
          cause: generateInvalidIdChatErrorInfo(idM),
          message: "Error when trying to update a chat",
          code: Errors.INVALID_ID,
        });
      }

      if (props.message.trim().length < 1) {
        console.log(`Message cannot be empty - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Message cannot be empty",
          cause: generateMessageEmptyChatErrorInfo(),
          message: "Error when trying to update a chat",
          code: Errors.MESSAGE_EMPTY,
        });
      }

      const newChat = await MessageModel.findByIdAndUpdate(idM, props, {
        new: true,
      });

      if (!newChat) {
        console.log(`Not found Chat - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Chat",
          cause: generateNotFoundChatErrorInfo(),
          message: "Error when trying to update a chat",
          code: Errors.NOT_FOUND,
        });
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
        //throw new Error("Invalid message ID");
        throw CustomError.createError({
          name: "Invalid chat ID",
          cause: generateInvalidIdChatErrorInfo(idM),
          message: "Error when trying to update a chat",
          code: Errors.INVALID_ID,
        });
      }

      const messageDeleted = await MessageModel.findByIdAndDelete(idM);

      if (!messageDeleted) {
        console.log(`Not found Message - ${getLocaleTime()}`);
        //throw new Error("Not found Message");
        throw CustomError.createError({
          name: "Not found Chat",
          cause: generateNotFoundChatErrorInfo(),
          message: "Error when trying to update a chat",
          code: Errors.NOT_FOUND,
        });
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
        throw CustomError.createError({
          name: "Invalid chat ID",
          cause: generateInvalidIdChatErrorInfo(idM),
          message: "Error when trying to update a chat",
          code: Errors.INVALID_ID,
        });
      }

      const updatedMessage = await MessageModel.findByIdAndUpdate(
        idM,
        { status: false },
        { new: true }
      );

      if (!updatedMessage) {
        console.log(`Not found Message - ${getLocaleTime()}`);
        throw CustomError.createError({
          name: "Not found Chat",
          cause: generateNotFoundChatErrorInfo(),
          message: "Error when trying to update a chat",
          code: Errors.NOT_FOUND,
        });
      }

      console.log(`Message removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default ChatManager;
