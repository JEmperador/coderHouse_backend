import express from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";
import morgan from "morgan";
import { isEmptyArray } from "./utils.js";
import { mongodb } from "./database.js";
import socketioHandler from "./socket.js";

const app = express();

const PORT = process.env.PORT || 8080;

//Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

//Navegador
const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    isEmptyArray: isEmptyArray,
  },
});

app.use("/static", express.static("./src/public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

router(app);

app.get("/", (req, res) => {
  res.render("index");
});

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

socketioHandler(httpServer);
