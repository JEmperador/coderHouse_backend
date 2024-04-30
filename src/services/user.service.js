import UserManager from "../dao/mongoDB/userManager.js";

const usermanager = new UserManager();

class UserService {
  createUser = async (user) => {
    const newUser = await usermanager.createUser(user);

    return "User was created successfully";
  };

  readUsers = async () => {
    const users = await usermanager.readUsers();

    return users;
  };

  readUserByEmail = async (email) => {
    const user = await usermanager.readUserByEmail(email);

    return user;
  };

  readUserValid = async (email, password) => {
    const userValid = await usermanager.readUserValid(email, password);

    return userValid;
  };

  updateUserPassword = async (email, password) => {
    const newUserPassword = await usermanager.updateUserPassword(
      email,
      password
    );

    return newUserPassword;
  };
}

export default UserService;
