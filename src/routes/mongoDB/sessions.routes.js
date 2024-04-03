import { UserModel } from "../../dao/models/user.model.js";
import { Router } from "express";

const router = Router();

router.post("/v1/sesssion/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });

  if (!user) {
    req.session.destroy();
    return res.redirect("/");
  } else {
    req.session.login = true;
  }

  req.session.user = user;

  return res.redirect("/products/realtimeproducts");
});

router.post("/v1/sesssion/register", async (req, res) => {
  const user = req.body;

  if (
    user.email === "adminCoder@coder.com" &&
    user.password === "adminCod3r123"
  ) {
    user.rol = "admin";
  }

  await UserModel.create(user);

  return res.redirect("/");
});

router.get("/v1/sesssion/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: err });
    }
    res.redirect("/");
  });
});

export default router;
