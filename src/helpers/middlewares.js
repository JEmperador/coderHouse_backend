import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Errors } from "./errors/enum.js";
import { logger } from "../configs/logger.config.js";
import multer from "multer";
import { promises as fs } from "fs";

dotenv.config();

//Passport
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res
          .status(401)
          .send({ error: info.message ? info.message : info.toString() });
      }

      req.user = user;

      next();
    })(req, res, next);
  };
};

//Check
export const checkRole = (allowedRoles) => (req, res, next) => {
  const token = req.cookies[process.env.COOKIE];

  if (token) {
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
      if (err) {
        res.status(403).send("Nop, tkn invalido");
      } else {
        const userRole = decoded.user.role;
        if (allowedRoles.includes(userRole)) {
          next();
        } else {
          res.status(403).send("Nop, no hay permiso");
        }
      }
    });
  } else {
    res.status(403).send("Nop, tkn no existe");
  }
};

//Errors
export const handlerError = (err, req, res, next) => {
  console.log(err.cause);
  switch (err.code) {
    case Errors.ALL_FIELD_REQUIRED:
      res.status(400).json({ status: "error", error: err.name });
      break;
    case Errors.INVALID_ID:
      res.status(400).json({ status: "error", error: err.name });
      break;
    case Errors.NOT_FOUND:
      res.status(400).json({ status: "error", error: err.name });
      break;
    case Errors.INVALID_CODE:
      res.status(400).json({ status: "error", error: err.name });
      break;
    default:
      res.status(500).json({ status: "error", error: "Unhandled error" });
  }
};

//Loggers
export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

//Multer
const folderMap = {
  profile: "src/uploads/profiles",
  products: "src/uploads/products",
  document: "src/uploads/documents",
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destinationFolder =
      folderMap[file.fieldname] || folderMap["document"];

    try {
      await fs.access(destinationFolder);
    } catch (err) {
      await fs.mkdir(destinationFolder, { recursive: true });
    }

    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${file.originalname
      .split(".")
      .slice(0, -1)
      .join(".")}-${new Date().toISOString().replace(/:/g, "-")}.${fileExt}`;

    cb(null, fileName);
  },
});

export const uploader = multer({ storage: storage });
