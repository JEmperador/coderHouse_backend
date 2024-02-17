import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const router = (app) => {
  app.use("/products", productsRouter);
  app.use("/carts", cartsRouter);
};

export default router;
