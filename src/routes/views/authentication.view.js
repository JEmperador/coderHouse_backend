import { Router } from "express";
import { passportCall } from "../../helpers/middlewares.js";
import ProfileDTO from "../../dto/profile.dto.js";
import { emailTokenExtractor } from "../../helpers/utils.js";

import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/", (req, res) => {
  if (req?.cookies[process.env.COOKIE]) {
    res.redirect("/profile");
  } else {
    res.render("login", { title: "Atlas Tech - Login", req: req });
  }
});

router.get("/register", (req, res) => {
  if (req?.cookies[process.env.COOKIE]) {
    res.redirect("/profile");
  } else {
    res.render("register", { title: "Atlas Tech - Register", req: req });
  }
});

router.get("/profile", passportCall("jwt"), (req, res) => {
  const user = req.user.user;

  const profile = new ProfileDTO(user);

  console.log(profile.isAdmin);

  res.render("profile", {
    title: "Atlas Tech - Profile",
    profile: profile,
    req: req,
  });
});

router.get("/resetRequest", (req, res) => {
  res.render("resetRequest", {
    title: "Atlas Tech - Reset Password Request",
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
      title: "Atlas Tech - Reset password",
      req: req,
      email: email,
    });
  }
});

router.get("/reset", (req, res) => {
  res.render("reset", { title: "Atlas Tech - Reset password", req: req });
});

router.get("/emailSend", (req, res) => {
  res.render("emailSend", { title: "Atlas Tech - Email send", req: req });
});

export default router;
