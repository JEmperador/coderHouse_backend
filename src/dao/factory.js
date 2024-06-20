import mongoProduct from "./mongoDB/productManager.js";
import mongoCart from "./mongoDB/cartManager.js";
import mongoChat from "./mongoDB/chatManager.js";
import mongoUser from "./mongoDB/userManager.js";
import mongoTicket from "./mongoDB/ticketManager.js";

import configSwitch from "../configs/switch.config.js";
const { persistence } = configSwitch;

export let productDAO;
export let cartDAO;
export let chatDAO;
export let userDAO;
export let ticketDAO;

switch (persistence) {
  case "mongo":
    productDAO = mongoProduct;
    cartDAO = mongoCart;
    chatDAO = mongoChat;
    userDAO = mongoUser;
    ticketDAO = mongoTicket;
    break;
  default:
    throw new Error("Invalid persistence");
}
