import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const router = (app) => {
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
};

export default router;
