import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Errors } from "./errors/enum.js";
import { logger } from "../configs/logger.config.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

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

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderMap = {
  profile: join(__dirname, "src/uploads/profiles"),
  products: join(__dirname, "src/uploads/products"),
  document: join(__dirname, "src/uploads/documents"),
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder =
      folderMap[file.fieldname] || join(__dirname, "src/uploads/others");
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
