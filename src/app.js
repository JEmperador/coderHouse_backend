import express from "express";
import router from "./routes/index.js";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome, to access the products or carts go to the route localhost:8080/products or localhost:8080/carts respectively",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
