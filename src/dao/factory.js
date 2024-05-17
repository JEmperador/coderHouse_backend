import mongoProduct from "./mongoDB/productManager.js";
import mongoCart from "./mongoDB/cartManager.js";
import mongoChat from "./mongoDB/chatManager.js";
import mongoUser from "./mongoDB/userManager.js";
import mongoTicket from "./mongoDB/ticketManager.js";

import fileSystemProduct from "./fileSystem/productManager.js";
import fileSystemCart from "./fileSystem/cartManager.js";
import fileSystemChat from "./fileSystem/chatManager.js";
import fileSystemUser from "./fileSystem/userManager.js";
import fileSystemTicket from "./fileSystem/ticketManager.js";

import memoryProduct from "./memory/productManager.js";
import memoryCart from "./memory/cartManager.js";
import memoryChat from "./memory/chatManager.js";
import memoryUser from "./memory/userManager.js";

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
  case "fileSystem":
    productDAO = fileSystemProduct;
    cartDAO = fileSystemCart;
    chatDAO = fileSystemChat;
    userDAO = fileSystemUser;
    ticketDAO = fileSystemTicket;
    break;
  case "memory":
    productDAO = memoryProduct;
    cartDAO = memoryCart;
    chatDAO = memoryChat;
    userDAO = memoryUser;
    break;
  default:
    throw new Error("Invalid persistence");
}
