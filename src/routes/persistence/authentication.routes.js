import { Router } from "express";
import passport from "passport";
import dotenv from "dotenv";
import {
  register,
  login,
  resetWithoutLoggedUser,
  resetWithLoggedUser,
  resetRequest,
  logout,
} from "../../controllers/authentication.controller.js";

dotenv.config();

const router = Router();

router.post("/v3/authentication/register", register);

router.post("/v3/authentication/login", login);

router.post("/v3/authentication/resetWithoutLoggedUser", resetWithoutLoggedUser);

router.post("/v3/authentication/resetWithLoggedUser", resetWithLoggedUser);

router.post("/v3/authentication/resetRequest", resetRequest);

//router.post("/v3/authentication/changeRole", );

router.get("/v3/authentication/logout", logout);

//GitHub
router.get(
  "/v3/authentication/login-github",
  passport.authenticate("github", { scope: ["user:email"], session: false }),
  async (req, res) => {}
);

router.get(
  "/v3/authentication/githubcallback",
  passport.authenticate("github", { failureRedirect: "/", session: false }),
  async (req, res) => {
    res.cookie(process.env.COOKIE, req.user.token);
    res.redirect("/profile");
  }
);

//Google
router.get(
  "/v3/authentication/login-google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
  async (req, res) => {}
);

router.get(
  "/v3/authentication/googlecallback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  async (req, res) => {
    res.cookie(process.env.COOKIE, req.user.token);
    res.redirect("/profile");
  }
);

export default router;
