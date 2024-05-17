import fs from "fs";
import {
  getNextId,
  getLocaleTime,
  createFile,
  saveData,
  readData,
} from "../../helpers/utils.js";

class ChatManager {
  static #path = "./mock/chats.json";
  constructor() {
    this.chats = [];
    ChatManager.#path;
  }

  createMessage = async ({ user, message, hour }) => {
    try {
      const fileExist = fs.existsSync(ChatManager.#path);

      if (!fileExist) {
        await createFile(ChatManager.#path);
      }

      const chats = await this.readMessages();

      const chat = {
        id: getNextId(ChatManager.#path),
        user,
        message,
        hour: getLocaleTime(),
        status: true,
      };

      chats.push(chat);
      await saveData(chats, ChatManager.#path);

      return true;
    } catch (err) {
      console.log(`${err} - ${getLocaleTime()}`);
      return err;
    }
  };

  readMessages = async () => {
    try {
      const fileExist = fs.existsSync(ChatManager.#path);

      if (!fileExist) {
        await createFile(ChatManager.#path);
      }

      const chats = await readData(ChatManager.#path);

      return chats;
    } catch (err) {
      console.log(`[] - ${getLocaleTime()}`);
      return err;
    }
  };

  updateMessage = async (id, props) => {
    try {
      const messages = await this.readMessages();

      const ix = await messages.findIndex(
        (message) => message.id === Number(id)
      );

      if (ix === -1) {
        console.log(`Not found Message - ${getLocaleTime()}`);
        throw new Error("Not found Message");
      }

      if (props.message.trim().length < 1) {
        console.log(`Message cannot be empty - ${getLocaleTime()}`);
        throw new Error("Message cannot be empty");
      }

      Object.assign(messages[ix], props);
      const updatedMessage = messages[ix];

      await saveData(messages, ChatManager.#path);

      console.log(updatedMessage);
      return updatedMessage;
    } catch (err) {
      throw err;
    }
  };

  physicalDeleteMessage = async (id) => {
    try {
      let chats = await this.readMessages();

      const chat = Object.values(chats).find((i) => i.id === Number(id));

      if (chat === undefined) {
        console.log(`Not found Message - ${getLocaleTime()}`);
        throw new Error("Not found Message");
      }

      chats = chats.filter((i) => i.id !== Number(id));
      const save = await saveData(chats, ChatManager.#path);

      console.log(`Message removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };

  logicalDeleteMessage = async (id) => {
    try {
      let chats = await this.readMessages();

      const chatIdx = Object.values(chats).findIndex(
        (i) => i.id === Number(id)
      );

      if (chatIdx === -1) {
        console.log(`Not found Message - ${getLocaleTime()}`);
        throw new Error("Not found Message");
      }

      chats[chatIdx].status = false;
      const save = await saveData(chats, ChatManager.#path);

      console.log(`Message removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default ChatManager;
