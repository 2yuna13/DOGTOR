import { PrismaClient, users, vet_region, vets } from "@prisma/client";
import { KORDATE } from "../../utils/constant";

const prisma = new PrismaClient();

class UserRepository {
  static async createUser(
    email: string,
    hashedPassword: string,
    nickname: string
  ) {
    try {
      return await prisma.users.create({
        data: {
          email: email,
          password: hashedPassword,
          nickname: nickname,
          role: "user",
          created_at: new Date(Date.now() + KORDATE),
          updated_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (err) {
      throw err;
    }
  }

  static async findUserByEmail(email: string) {
    try {
      return await prisma.users.findUnique({
        where: { email },
      });
    } catch (err) {
      throw err;
    }
  }

  static async createVerificationCode(email: string, verificationCode: string) {
    try {
      return await prisma.verificationCodes.create({
        data: {
          email: email,
          code: verificationCode,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  static async findCodeByEmail(email: string) {
    try {
      return await prisma.verificationCodes.findFirst({
        where: { email },
        orderBy: { createdAt: "desc" },
      });
    } catch (err) {
      throw err;
    }
  }

  static async deleteCodeByEmail(email: string) {
    try {
      return await prisma.verificationCodes.deleteMany({
        where: { email },
      });
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(email: string) {
    try {
      return await prisma.users.delete({
        where: { email },
      });
    } catch (err) {
      throw err;
    }
  }

  static async createVet(
    userEmail: string,
    name: string,
    hospitalName: string,
    description: string,
    region: vet_region,
    file_path: string
  ) {
    try {
      return await prisma.vets.create({
        data: {
          user_email: userEmail,
          name: name,
          hospital_name: hospitalName,
          description: description,
          region: region,
          img_path: file_path,
          created_at: new Date(Date.now() + KORDATE),
          updated_at: new Date(Date.now() + KORDATE),
        },
      });
    } catch (err) {
      throw err;
    }
  }
  static async findVetByEmail(email: string) {
    try {
      return await prisma.vets.findFirst({
        where: { user_email: email },
      });
    } catch (err) {
      throw err;
    }
  }

  static async updateUserByEmail(user: users) {
    try {
      return await prisma.users.update({
        where: { email: user.email },
        data: user,
      });
    } catch (err) {
      throw err;
    }
  }

  static async updateVetByEmail(vet: vets) {
    try {
      return await prisma.vets.update({
        where: { id: vet.id },
        data: vet,
      });
    } catch (err) {
      throw err;
    }
  }

  static async findPostByEmail(
    email: string,
    startIndex: number,
    rowPerPage: number
  ) {
    try {
      return await prisma.posts.findMany({
        where: { author_email: email, deleted_at: null },
        skip: startIndex,
        take: rowPerPage,
      });
    } catch (error) {
      throw error;
    }
  }

  static async countPostsByEmail(email: string) {
    try {
      return await prisma.posts.count({
        where: { author_email: email, deleted_at: null },
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteVet(email: string) {
    try {
      return await prisma.vets.deleteMany({
        where: { user_email: email, status: "rejected" },
      });
    } catch (error) {
      throw error;
    }
  }
}

export { UserRepository };
