import mongoose from "mongoose";

const messagesCollection = "messages";

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
  hour: String,
  status: Boolean,
});

mongoose.set("strictQuery", false);

export const MessageModel = mongoose.model(messagesCollection, messageSchema);
