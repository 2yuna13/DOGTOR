import { connection } from "../../app";
import { logger } from "../../utils/winston";
import { PrismaClient } from "@prisma/client";
import { UserDto } from "../dtos/userDto";

const prisma = new PrismaClient();

class userService {
  static async addUser(userDto: UserDto) {
    try {
      const createUser = await prisma.users.create({
        data: {
          email: userDto.email,
          password: userDto.password,
          username: userDto.userName,
          role: "user",
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      return createUser;
    } catch (err) {
      throw err;
    }
  }
}

export { userService };
