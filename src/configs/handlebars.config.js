import handlebars from "express-handlebars";
import { cookieExists } from "../helpers/utils.js";

const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    cookieExists: cookieExists,
  },
});

export default hbs;
