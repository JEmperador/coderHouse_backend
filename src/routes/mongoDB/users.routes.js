import UserManager from "../../dao/mongoDB/userManager.js";
import { Router } from "express";
import { createHash } from "../../helpers/utils.js";

const userManager = new UserManager();
const router = Router();

router.post("/v2/users", async (req, res) => {
  const { first_name, last_name, email, age, password, social, rol } = req.body;

  if (!first_name || !last_name || !email || !age) {
    return res.status(400).json("All fields are required");
  }

  try {
    const user = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      social,
      rol,
    };

    const result = await userManager.createUser(user);

    res.status(201).json("User created");
  } catch (err) {
    if (err.message.includes("Email")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get("/v2/users", async (req, res) => {
  try {
    const users = await userManager.getUsers();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/v2/users/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userManager.getUserByEmail(email);

    res.status(200).json(user);
  } catch (err) {
    if (err.message.includes("User not")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put("/v2/users", async (req, res) => {
  const { email, password } = req.body;

  try {
    const reset = await userManager.updatePassword(email, password);

    res.status(200).json("Password reset");
  } catch (err) {
    if (err.message.includes("Email")) {
      res.status(404).json(err.message);
    } else if (err.message.includes("Same password")) {
      res.status(404).json(err.message);
    } else {
      res.status(500).json(err);
    }
  }
});

export default router;
