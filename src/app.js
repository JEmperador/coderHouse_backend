import express from "express";
import router from "./routes/index.js";
import hbs from "./configs/handlebars.js";
import morgan from "morgan";
import { mongodb } from "./services/mongo.js";
import socketioHandler from "./helpers/socket.js";

const app = express();

const PORT = process.env.PORT || 8080;

//Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

//Navegador
app.use("/static", express.static("./src/public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

router(app);

app.get("/", (req, res) => {
  res.render("index", { title: "Atlas Tech" });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

socketioHandler(httpServer);
