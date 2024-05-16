import {
  getLocaleTime
} from "../../helpers/utils.js";

class ChatManager {
  constructor() {
    this.chats = [];
  }

  _getNextId = () => {
    const count = this.chats.length;
    const nextId = count > 0 ? this.chats[count - 1].id + 1 : 1;

    return nextId;
  };

  createMessage = async ({ user, message, hour }) => {
    try {

      const chats = await this.readMessages();

      const chat = {
        id: this._getNextId(),
        user,
        message,
        hour: getLocaleTime(),
        status: true,
      };

      chats.push(chat);
    } catch (err) {
      console.log(`${err} - ${getLocaleTime()}`);
      return err;
    }
  };

  readMessages = async () => {
    try {
      const chats = this.chats;

      return chats;
    } catch (err) {
      console.log(`${err} - ${getLocaleTime()}`);
      return [];
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

      const newChats = chats.filter((i) => i.id !== Number(id));
      this.chats = newChats;

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

      console.log(`Message removed - ${getLocaleTime()}`);
      return true;
    } catch (err) {
      throw err;
    }
  };
}

export default ChatManager;
