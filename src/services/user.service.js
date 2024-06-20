import { userDAO } from "../dao/factory.js";

const dao = new userDAO();

class UserService {
  createUser = async (user) => {
    const newUser = await dao.createUser(user);

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

  updateUserRole = async (email) => {
    const newUserRole = await dao.updateUserRole(email);

    return newUserRole;
  };
}

export default UserService;
