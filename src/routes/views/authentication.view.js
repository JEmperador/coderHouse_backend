import { Router } from "express";
import { passportCall } from "../../helpers/middlewares.js";
import ProfileDTO from "../../dto/profile.dto.js";

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

router.get(
  "/profile",
  passportCall("jwt"),
  (req, res) => {
    const user = req.user.user;

    const profile = new ProfileDTO(user)

    res.render("profile", {
      title: "Atlas Tech - Profile",
      profile: profile,
      req: req,
    });
  }
);

router.get("/reset", (req, res) => {
  res.render("reset", { title: "Atlas Tech - Reset password", req: req });
});

export default router;
