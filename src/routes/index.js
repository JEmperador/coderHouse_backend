//Backend
//File System
import productsRouterFileSystem from "./fileSystem/products.routes.js";
import cartsRouterFileSystem from "./fileSystem/carts.routes.js";
//MongoDB
import productRouterMongo from "./mongoDB/products.routes.js";
import cartRouterMongo from "./mongoDB/carts.routes.js";
import chatRouterMongo from "./mongoDB/chats.routes.js";
import userRouterMongo from "./mongoDB/users.routes.js";
import authenticationRouterMongo from "./mongoDB/authentication.routes.js";
//Frontend
import productsRouterView from "./views/products.view.js";
import cartRouterView from "./views/cart.view.js";
import chatRouterView from "./views/chat.view.js";
import authenticationRouterView from "./views/authentication.view.js";
import page404RouterView from "./views/page404.view.js";

const router = (app) => {
  //Backend
  app.use("/api", productsRouterFileSystem);
  app.use("/api", cartsRouterFileSystem);
  app.use("/api", productRouterMongo);
  app.use("/api", cartRouterMongo);
  app.use("/api", chatRouterMongo);
  app.use("/api", userRouterMongo);
  app.use("/api", authenticationRouterMongo);
  //Frontend
  app.use("/products", productsRouterView);
  app.use("/cart", cartRouterView);
  app.use("/chat", chatRouterView);
  app.use("/", authenticationRouterView);
  app.use("*", page404RouterView);
};

export default router;
