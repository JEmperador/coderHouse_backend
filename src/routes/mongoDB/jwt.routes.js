import { Router } from "express";
import {
  register as registerV1,
  login as loginV1,
  reset as resetV1,
  logout as logoutV1,
} from "./jwt/v1.js";

const router = Router();

router.post("/v1/jwt/register", registerV1);

router.post("/v1/jwt/login", loginV1);

router.post("/v1/jwt/reset", resetV1);

router.get("/v1/jwt/logout", logoutV1);

export default router;
