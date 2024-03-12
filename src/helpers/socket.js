import { Server } from "socket.io";
import ProductManager from "../dao/mongoDB/productManager.js";
import ChatManager from "../dao/mongoDB/chatManager.js";
const productManager = new ProductManager();
const chatManager = new ChatManager();

export default function socketioHandler(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`New user ${socket.id} joined`);

    //Recibe del front - Creacion de producto
    socket.on("client:newProduct", async (data) => {
      try {
        const { title, description, price, code, stock, category } = data;

        const thumbnail = Array.isArray(data.thumbnail)
          ? data.thumbnail
          : data.thumbnail.length > 0
          ? [data.thumbnail]
          : [];

        const postProducts = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          category,
        };

        await productManager.addProduct(postProducts);

        //Envia el back
        const products = await productManager.getProducts();
        const listProducts = products.filter(
          (product) => product.status === true
        );

        console.log(listProducts);

        io.emit("server:list", listProducts);
      } catch (err) {
        io.emit("server:error", err.message);
      }
    });

    //Recibe del front - Eliminacion de producto
    socket.on("client:deleteProduct", async (data) => {
      try {
        const id = data;

        const logicalDeleteProduct = await productManager.logicalDeleteProduct(
          id
        );

        //Envia el back
        const products = await productManager.getProducts();
        const listProducts = products.filter(
          (product) => product.status === true
        ); //Solo para mostrar los productos con status true
        io.emit("server:list", listProducts);
      } catch (err) {
        io.emit("server:error", err.message);
      }
    });

    socket.on("new", (user) => console.log(`${user} joined`));

    //Recibe del front - Mensajes
    socket.on("client:message", async (data) => {
      const message = await chatManager.saveMessage(data);
      //Envia el back
      const messages = await chatManager.getMessages();
      const messagesReverse = messages.reverse();
      io.emit("server:messages", messagesReverse);
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
}
