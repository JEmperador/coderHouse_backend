import express from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductManager from "./controllers/productManager.js";
import ChatManager from "./controllers/chatManager.js";
import { isEmptyArray } from "./utils.js";
const productManager = new ProductManager();
const chatManager = new ChatManager();

const app = express();

const PORT = process.env.PORT || 8080;

//Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Navegador
app.use("/static", express.static("./src/public"));
app.engine(
  "handlebars",
  handlebars.engine({
    helpers: {
      isEmptyArray: isEmptyArray,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

router(app);

app.get("/", (req, res) => {
  res.render("index");
});

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`New user ${socket.id} joined`);

  //Recibe del front - Creacion de producto
  socket.on("client:newProduct", async (data) => {
    const { title, description, price, code, stock, category } = data;

    const thumbnail = Array.isArray(data.thumbnail)
      ? data.thumbnail
      : [data.thumbnail];

    const postProducts = await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    );

    //Envia el back
    const products = await productManager.getProducts();
    const listProducts = products.filter((product) => product.status === true);

    io.emit("server:list", listProducts);
  });

  //Recibe del front - Eliminacion de producto
  socket.on("client:deleteProduct", async (data) => {
    const id = Number(data);

    const logicalDeleteProduct = await productManager.logicalDeleteProduct(id);

    //Envia el back
    const products = await productManager.getProducts();
    const listProducts = products.filter((product) => product.status === true); //Solo para mostrar los productos con status true
    io.emit("server:list", listProducts);
  });

  socket.on("new", (user) => console.log(`${user} joined`));

  //Recibe del front - Mensajes
  socket.on("message", async (data) => {
    const message = await chatManager.saveMessage(data);
    //Envia el back
    const messages = await chatManager.getMessasges();
    const messagesReverse = messages.reverse()
    io.emit("logs", messagesReverse);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});
