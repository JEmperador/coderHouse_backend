import { UserModel } from "../../dao/models/user.model.js";
import { Router } from "express";

const router = Router();

router.post("/v1/sesssion/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email, password });

    if (!user) {
      console.log("User o password not found");
      req.session.destroy();
      return res.status(404).redirect("/");
    } else {
      req.session.login = true;
    }

    req.session.user = user;

    return res.redirect("/profile");
  } catch (err) {
    console.log("Internal server error");
    res.status(500).redirect("/")
  }
});

router.post("/v1/sesssion/reset", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("User not found");
      req.session.destroy();
      return res.status(404).redirect("/");
    } else {
      const userId = user._id;

      const userNewPassword = await UserModel.findByIdAndUpdate(userId, {password: password})
    }

    return res.status(200).redirect("/");
  } catch (err) {
    console.log("Internal server error");
    res.status(500).redirect("/")
  }
});

router.post("/v1/sesssion/register", async (req, res) => {
  const {first_name, last_name, email, age, password} = req.body

  try {
    const userExist = await UserModel.findOne({email: email});

    if(userExist) {
      console.log("Email is already registered");
      return res.status(400).redirect("/")
    }

    const user = {first_name, last_name, email, age, password}

    if (
      user.email === "adminCoder@coder.com" &&
      user.password === "adminCod3r123"
    ) {
      user.rol = "admin";
    }
  
    await UserModel.create(user);

    return res.status(200).redirect("/");
  } catch (err) {
    console.log("Internal server error");
    res.status(500).redirect("/")
  }
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
