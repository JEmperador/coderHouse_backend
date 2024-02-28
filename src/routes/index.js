import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import productsView from "./products.view.js";
import cartView from "./cart.view.js";
import chatView from "./chat.view.js";

const router = (app) => {
  //Postman
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  //Navegador
  app.use("/products", productsView);
  app.use("/cart", cartView);
  app.use("/chat", chatView);
};

export default router;
