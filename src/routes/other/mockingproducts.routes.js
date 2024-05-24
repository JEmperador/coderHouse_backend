import { Router } from "express";
import { readProducts } from "../../controllers/mockingproducts.controller.js";

const router = Router();

router.get("/v3/mockingproducts", readProducts);

export default router;
