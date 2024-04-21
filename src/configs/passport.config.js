import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import github from "passport-github2";
import google from "passport-google-oauth20";
import dotenv from "dotenv";
import { UserModel } from "../dao/models/user.model.js";
import {
  createHash,
  isValidPassword,
  serializeUser,
  deserializeUser,
  cookieExtractor,
} from "../helpers/utils.js";

dotenv.config();

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const GitHubStrategy = github.Strategy;
const GoogleStrategy = google.Strategy;

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
          const user = await UserModel.findOne({ email });
          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            social: "Local",
          };

          if (newUser.email === "adminCoder@coder.com") {
            newUser.rol = "admin";
          }

          const result = await UserModel.create(newUser);

          return done(null, false);
        } catch (err) {
          return done(`Error: ${err}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            console.log("User doesn't exists");
            return done(null, false);
          }

          if (!isValidPassword(password, user)) {
            console.log("Password not valid");
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRET_JWT,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.CLIENT_GITHUB_ID,
        clientSecret: process.env.CLIENT_GITHUB_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile._json.email;
          const fullName = profile._json.name.split(" ");
          const name = fullName[0];
          const lastName = fullName[1];

          const user = await UserModel.findOne({ email });

          if (user) {
            console.log(`User ${email} already exists`);
            return done(null, user);
          }

          const newUser = {
            first_name: name,
            last_name: lastName,
            email: email,
            password: "",
            social: "GitHub",
          };

          const result = await UserModel.create(newUser);

          return done(null, result);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_GOOGLE_ID,
        clientSecret: process.env.CLIENT_GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const email = profile._json.email;
          const name = profile._json.given_name;
          const lastName = profile._json.family_name;

          const user = await UserModel.findOne({ email: email });

          if (user) {
            console.log(`User ${email} already exists`);
            return cb(null, user);
          }

          const newUser = {
            first_name: name,
            last_name: lastName,
            email: email,
            password: "",
            social: "Google",
          };

          const result = await UserModel.create(newUser);

          return cb(null, result);
        } catch (err) {
          return cb(`Error: ${err}`);
        }
      }
    )
  );

  passport.serializeUser(serializeUser);

  passport.deserializeUser(deserializeUser);
};
