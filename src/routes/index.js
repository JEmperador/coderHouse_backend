//Backend
import productRouter from "./persistence/products.routes.js";
import cartRouter from "./persistence/carts.routes.js";
import chatRouter from "./persistence/chats.routes.js";
import userRouter from "./persistence/users.routes.js";
import authenticationRouter from "./persistence/authentication.routes.js";
import ticketRouter from "./persistence/ticket.routes.js";
import mockingProductsRouter from "./other/mockingproducts.routes.js";
//Frontend
import productsRouterView from "./views/products.view.js";
import productsAdminRouterView from "./views/productsAdmin.view.js";
import cartRouterView from "./views/cart.view.js";
import chatRouterView from "./views/chat.view.js";
import authenticationRouterView from "./views/authentication.view.js";
import page404RouterView from "./views/page404.view.js";

import { checkRole } from "../helpers/middlewares.js";

const router = (app) => {
  //Backend
  app.use("/api", productRouter);
  app.use("/api", cartRouter);
  app.use("/api", chatRouter);
  app.use("/api", userRouter);
  app.use("/api", authenticationRouter);
  app.use("/api", ticketRouter);
  app.use("/api", mockingProductsRouter);
  //Frontend
  app.use("/products", checkRole(["user"]), productsRouterView);
  app.use("/productsAdmin", checkRole(["admin"]), productsAdminRouterView);
  app.use("/cart", checkRole(["user"]), cartRouterView);
  app.use("/chat", checkRole(["user"]), chatRouterView);
  app.use("/", authenticationRouterView);
  app.use("*", page404RouterView);
};

export default router;
