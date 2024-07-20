import { Router } from "express";
import {
  createUser,
  login,
  logout,
  readUserByEmail,
  readUsers,
  register,
  reset,
  updateUserPassword,
  updateUserRole,
} from "../../controllers/users.controller.js";
import { uploader } from "../../helpers/middlewares.js";

const router = Router();

router.post("/v3/users", createUser);

router.post("/v3/users/:email/documents", uploader.fields([{ name: "document" }, { name: "products" }, { name: "profile" }]));

router.get("/v3/users", readUsers);

router.get("/v3/users/:email", readUserByEmail);

router.get("/v3/logout", logout);

router.put("/v3/users", updateUserPassword);

router.put("/v3/users/:email", updateUserRole);

router.post("/v3/register", register);

router.post("/v3/login", login);

router.post("/v3/reset", reset);


export default router;
