import express from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
//const ProductManager = require("./managers/product/productManager");
import ProductManager from "./controllers/productManager.js";
const productManager = new ProductManager();

const app = express();

const PORT = process.env.PORT || 8080;

//Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Navegador
app.use("/static", express.static("./src/public"));
app.engine("handlebars", handlebars.engine());
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

  //Recibe del front
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

  //Recibe del front
  socket.on("cliente:deleteProduct", async (data) => {
    const id = data;

    console.log(id);

    const logicalDeleteProduct = await productManager.logicalDeleteProduct(id);

    //Envia el back
    const products = await productManager.getProducts();

    //Solo para mostrar los productos con status true
    const listProducts = products.filter((product) => product.status === true);

    io.emit("server:list", listProducts);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});
