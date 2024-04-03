import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  if (req.session?.user) {
    res.redirect("/profile");
  }

  res.render("login", { title: "Atlas Tech - Login", req: req });
});

router.get("/register", (req, res) => {
  if (req.session?.user) {
    res.redirect("/profile");
  }

  res.render("register", { title: "Atlas Tech - Register", req: req });
});

function auth(req, res, next) {
  if (req.session?.user) return next();
  res.redirect("/");
}

router.get("/profile", auth, (req, res) => {
  const user = req.session.user;

  user.title = "Atlas Tech - Profile";

  res.render("profile", { user: user, req: req });
});

export default router;
