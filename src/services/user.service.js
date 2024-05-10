import { userDAO } from "../dao/factory.js";

const dao = new userDAO();

class UserService {
  createUser = async (
    first_name,
    last_name,
    email,
    age,
    password,
    social,
    role
  ) => {
    const newUser = await dao.createUser({
      first_name,
      last_name,
      email,
      age,
      password,
      social,
      role,
    });

    return newUser;
  };

  readUsers = async () => {
    const users = await dao.readUsers();

    return users;
  };

  readUserByEmail = async (email) => {
    const user = await dao.readUserByEmail(email);

    return user;
  };

  readUserValid = async (email, password) => {
    const userValid = await dao.readUserValid(email, password);

    return userValid;
  };

  updateUserPassword = async (email, password) => {
    const newUserPassword = await dao.updateUserPassword(email, password);

    return newUserPassword;
  };
}

export default UserService;
