import { Router } from "express";
import { loggerTest } from "../../controllers/loggertest.controller.js";

const router = Router();

router.get("/v3/loggertest", loggerTest);

export default router;
