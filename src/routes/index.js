import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import productsView from "./products.view.js";
import cartView from "./cart.view.js";

const router = (app) => {
  //Postman
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  //Navegador
  app.use("/products", productsView);
  app.use("/cart", cartView);
};

export default router;
