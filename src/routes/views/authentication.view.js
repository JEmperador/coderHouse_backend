import dotenv from "dotenv";
import { Router } from "express";
import { passportCall } from "../../helpers/middlewares.js";
import ProfileDTO from "../../dto/profile.dto.js";
import { emailTokenExtractor } from "../../helpers/utils.js";
import UserService from "../../services/user.service.js";

dotenv.config();

const userService = new UserService();

const router = Router();

router.get("/", (req, res) => {
  if (req?.cookies[process.env.COOKIE]) {
    res.redirect("/profile");
  } else {
    res.render("login", { title: "Atlas Tech | Login", req: req });
  }
});

router.get("/register", (req, res) => {
  if (req?.cookies[process.env.COOKIE]) {
    res.redirect("/profile");
  } else {
    res.render("register", { title: "Atlas Tech | Register", req: req });
  }
});

router.get("/profile", passportCall("jwt"), (req, res) => {
  const user = req.user.user;

  const profile = new ProfileDTO(user);

  res.render("profile", {
    title: "Atlas Tech | Profile",
    profile: profile,
    req: req,
  });
});

router.get("/profile/admin-panel", passportCall("jwt"), async (req, res) => {
  try {
    const users = await userService.readUsers();

    const usersDTO = users.map((user) => new ProfileDTO(user))

    res.render("admin-panel", {
      title: "Atlas Tech | Admin Panel",
      users: usersDTO,
      req: req,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/resetRequest", (req, res) => {
  res.render("resetRequest", {
    title: "Atlas Tech | Reset Password Request",
    req: req,
  });
});

router.get("/afterResetRequest/:token", async (req, res) => {
  const { token } = req.params;

  let email = "";

  email = await emailTokenExtractor(token);

  if (email === "") {
    res.redirect("/resetRequest");
  } else {
    res.render("afterResetRequest", {
      title: "Atlas Tech | Reset password",
      req: req,
      email: email,
    });
  }
});

router.get("/reset", (req, res) => {
  res.render("reset", { title: "Atlas Tech | Reset password", req: req });
});

router.get("/emailSend", (req, res) => {
  res.render("emailSend", { title: "Atlas Tech | Email send", req: req });
});

export default router;
