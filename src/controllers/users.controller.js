import UserService from "../services/user.service.js";
import { generateToken } from "../helpers/utils.js";

const userService = new UserService();

export const createUser = async (req, res, next) => {
  const { first_name, last_name, email, age, password, social, role } =
    req.body;

  try {
    const newUser = await userService.createUser(
      first_name,
      last_name,
      email,
      age,
      password,
      social,
      role
    );

    res.status(201).json("User created");
  } catch (err) {
    next(err);
  }
};

export const uploadDocuments = async (req, res, next) => {
  const { email } = req.params;
  const uploadedDocuments = req.files;

  try {
    const user = await userService.readUserByEmail(email);

    if (uploadedDocuments) {
      if (uploadedDocuments.document) {
        user.documents = user.documents.concat(
          uploadedDocuments.document.map((doc) => {
            const fileNameWithoutExt = doc.originalname
              .split(".")
              .slice(0, -1)
              .join(".");
            return {
              name: fileNameWithoutExt,
              reference: doc.path,
            };
          })
        );
      }

      if (uploadedDocuments.products) {
        user.documents = user.documents.concat(
          uploadedDocuments.products.map((doc) => ({
            name: doc.originalname,
            reference: doc.path,
          }))
        );
      }

      if (uploadedDocuments.profile) {
        user.documents = user.documents.concat(
          uploadedDocuments.profile.map((doc) => ({
            name: doc.originalname,
            reference: doc.path,
          }))
        );
      }
    }

    const result = await user.save();

    res.status(200).json("User document updated");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const readUsers = async (req, res) => {
  try {
    const users = await userService.readUsers();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const readUserByEmail = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await userService.readUserByEmail(email);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserPassword = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const newUserPassword = await userService.updateUserPassword(
      email,
      password
    );

    res.status(200).json("Password reset");
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  const { email } = req.params;

  try {
    const newUserRole = await userService.updateUserRole(email);

    if (!newUserRole) {
      res.status(400).json("Missing documentation");
    }

    res.status(200).json("Changed role");
  } catch (err) {
    next(err);
  }
};

export const physicalDeleteUser = async (req, res, next) => {
  const { uid } = req.params;

  try {
    let result = await userService.physicalDeleteUser(uid);

    res.status(204).json("User deleted");
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  const { first_name, last_name, email, age, password, social, role } =
    req.body;

  try {
    const user = {
      first_name,
      last_name,
      email,
      age,
      password,
      social,
      role,
    };

    const newUser = await userService.createUser(user);

    const token = generateToken({ id: newUser._id });

    res
      .cookie(process.env.COOKIE, token, {
        maxAge: 60 * 60 * 2000,
        httpOnly: true,
      })
      .json({
        status: "success",
        message: "Successful register",
        token: token,
      });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userValid = await userService.readUserValid(email, password);

    const loginUser = {
      first_name: userValid.first_name,
      last_name: userValid.last_name,
      email: userValid.email,
      role: userValid.role,
    };

    const token = generateToken(loginUser);

    res
      .cookie(process.env.COOKIE, token, {
        maxAge: 60 * 60 * 2000,
        httpOnly: true,
      })
      .json({ status: "success", message: "Successful login", token: token });
  } catch (err) {
    next(err);
  }
};

export const reset = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.readUserValid(email);

    const newUserPassword = await userService.updateUserPassword(
      email,
      password
    );

    const token = generateToken({ id: user._id });

    res
      .cookie(process.env.COOKIE, token, {
        maxAge: 60 * 60 * 2000,
        httpOnly: true,
      })
      .json({
        status: "success",
        message: "Successful reset password",
        token: token,
      });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  if (req?.cookies[process.env.COOKIE]) {
    res
      .clearCookie(process.env.COOKIE, { secure: true })
      .status(200)
      .json({ status: "success", message: "Successful logout" });
  } else {
    res.status(400).json({ status: "failure", message: "Not logged in" });
  }
};
