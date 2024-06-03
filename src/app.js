import express from "express";
import compression from "express-compression";
import router from "./routes/index.js";
import hbs from "./configs/handlebars.config.js";
import morgan from "morgan";
import MongoDB from "./databases/mongo.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { initializePassport } from "./configs/passport.config.js";
import socketioHandler from "./helpers/socket.js";
import { handlerError } from "./helpers/middlewares.js";
import { addLogger } from "./helpers/middlewares.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/static", express.static("./src/public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.use(addLogger);

router(app);
app.use(handlerError);

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});

socketioHandler(httpServer);
