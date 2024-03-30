import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  if (req.session?.user) {
    res.redirect("/profile");
  }

  res.render("login", { title: "Atlas Tech - Login" });
});

router.get("/register", (req, res) => {
  if (req.session?.user) {
    res.redirect("/profile");
  }

  res.render("register", { title: "Atlas Tech - Register" });
});

function auth(req, res, next) {
  if (req.session?.user) return next();
  res.redirect("/");
}

router.get("/profile", auth, (req, res) => {
  const user = req.session.user;

  user.title = "Atlas Tech - Profile"

  res.render("profile", user);
});

export default router;
