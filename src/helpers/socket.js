import { Server } from "socket.io";
import { emailSenderDeleteProduct, emailSenderDeleteUser, socketUserName } from "./utils.js";
import ProductService from "../services/product.service.js";
import CartService from "../services/cart.service.js";
import ChatService from "../services/chat.service.js";
import UserService from "../services/user.service.js";
import { getTransport } from "../configs/transport.config.js";

const productService = new ProductService();
const cartService = new CartService();
const chatService = new ChatService();
const userService = new UserService();

export default function socketioHandler(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    const userName = socketUserName(socket.handshake.headers.cookie);

    console.log(`New user ${userName} joined`);

    //Recibe del front - Creacion de producto
    socket.on("client:newProduct", async (data) => {
      try {
        const {
          title,
          description,
          price,
          code,
          stock,
          category,
          status,
          owner,
        } = data;

        const thumbnail = data.thumbnail.lenght > 0 ? data.thumbnail : "";

        await productService.createProduct(
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          category,
          status,
          owner
        );

        //Envia el back
        const products = await productService.readProducts();
        const listProducts = products.filter(
          (product) => product.status === true
        );

        io.emit("server:list", listProducts);
      } catch (err) {
        io.emit("server:error", err.message);
      }
    });

    //Recibe del front - Eliminacion de producto
    socket.on("client:deleteProduct", async (data) => {
      try {
        const { id, publicationOwner } = data;

        const product = await productService.readProductById(id);

        const transport = getTransport(publicationOwner);

        const logicalDeleteProduct = await productService.logicalDeleteProduct(
          id
        );

        await emailSenderDeleteProduct(transport, publicationOwner, product);

        //Envia el back
        const products = await productService.readProducts();
        const listProducts = products.filter(
          (product) => product.status === true
        ); //Solo para mostrar los productos con status true
        io.emit("server:list", listProducts);
      } catch (err) {
        io.emit("server:error", err.message);
      }
    });

    //Recibe del front - Eliminacion de producto (en carrito)
    socket.on("client:deleteProductOnCart", async (data) => {
      try {
        const cid = data.cartId;
        const pid = data.id;

        const deleteProductOnCart = await cartService.physicalDeleteProductById(
          cid,
          pid
        );

        //Envia el back
        const cart = await cartService.readCartById(cid);
        io.emit("server:cart", cart);
      } catch (err) {
        io.emit("server:error", err.message);
      }
    });

    //Recibe del front - Incorporacion de producto (en carrito)
    socket.on("client:addProductOnCart", async (data) => {
      try {
        const cid = data.cartId;
        const pid = data.id;
        const quantity = data.selectedQuantity > 1 ? data.selectedQuantity : 1;

        const addProductOnCart = await cartService.updateCart(
          cid,
          pid,
          Number(quantity)
        );

        //Envia el back
        const cart = await cartService.readCartById(cid);
        io.emit("server:add", cart);
      } catch (err) {
        io.emit("server:error", err.message);
      }
    });

    //Recibe del front - Eliminacion de usuario
    socket.on("client:deleteUser", async (data) => {
      try {
        const { id, userEmail } = data;

        const transport = getTransport(userEmail);

        const physicalDeleteUser = await userService.physicalDeleteUser(id);

        await emailSenderDeleteUser(transport, userEmail);

        //Envia el back
        const listUsers = await userService.readUsers();

        io.emit("server:list-users", listUsers);
      } catch (err) {
        io.emit("server:error", err.message);
      }
    });

    socket.on("new", (user) => console.log(`${user} joined to Chat`));

    //Recibe del front - Mensajes
    socket.on("client:message", async (data) => {
      const message = await chatService.createMessage(data);
      //Envia el back
      const messages = await chatService.readMessages();
      const messagesReverse = messages.reverse();
      io.emit("server:messages", messagesReverse);
    });

    //Recibe del front - Mensajes
    socket.on("client:editMessage", async (data) => {
      const { id, user, message, hour } = data;

      const newMessage = await chatService.updateMessage(id, {
        user,
        message,
        hour,
      });
      //Envia el back
      const messages = await chatService.readMessages();
      const messagesReverse = messages.reverse();
      io.emit("server:messages", messagesReverse);
    });

    socket.on("disconnect", () => {
      console.log(`User ${userName} disconnected`);
    });
  });
}
