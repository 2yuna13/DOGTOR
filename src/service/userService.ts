import { connection } from "../app";
import { logger } from "../utils/winston";
import userModel from "../model/userModel";

class userService {
  static async addUser(emailId: string, password: string, username: string) {
    try {
      const query = userModel.insertUser;
      await connection.promise().query(query, [emailId, password, username]);
    } catch (err) {
      throw err;
    }
  }
}

export { userService };
