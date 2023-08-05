import { connection } from "../../app";
import { logger } from "../../utils/winston";
import { PrismaClient } from "@prisma/client";
import {
  UserDto,
  UserRegisterDto,
  VerifyEmailDto,
  UserLoginDto,
  VerifyVetDto,
  VetDto,
} from "../dtos/userDto";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/mail";
const prisma = new PrismaClient();

const currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 9);

class UserService {
  static async addUser(userRegisterDto: UserRegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(userRegisterDto.password, 10);

      const createUser = await prisma.users.create({
        data: {
          email: userRegisterDto.email,
          password: hashedPassword,
          nickname: userRegisterDto.nickname,
          role: "user",
          created_at: currentDate,
          updated_at: currentDate,
        },
      });
      return createUser;
    } catch (err) {
      throw err;
    }
  }

  static async createVerificationCode(email: string) {
    const existingUser = await prisma.users.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return null;
    }

    const verificationCode = sendEmail(email);

    const verification = await prisma.verificationCodes.create({
      data: {
        email: email,
        code: verificationCode,
      },
    });
    return verification;
  }

  static async verifyUserEmail(verifyEmailDto: VerifyEmailDto) {
    try {
      // 사용자 이메일과 인증 코드를 사용하여 인증 확인
      const verificationCode = await prisma.verificationCodes.findFirst({
        where: { email: verifyEmailDto.email },
        orderBy: { createdAt: "desc" },
      });

      if (!verificationCode || verificationCode.code !== verifyEmailDto.code) {
        throw new Error("인증 코드가 유효하지 않습니다.");
      }

      await prisma.verificationCodes.deleteMany({
        where: { email: verifyEmailDto.email },
      });

      return;
    } catch (err) {
      throw err;
    }
  }

  static async loginUser(userLoginDto: UserLoginDto) {
    try {
      const user = await prisma.users.findUnique({
        where: { email: userLoginDto.email },
      });

      if (!user) {
        throw new Error("해당 이메일은 가입 내역이 없습니다.");
      }

      if (user.deleted_at !== null) {
        throw new Error("해당 이메일은 강제 탈퇴된 계정입니다.");
      }

      const passwordMatch = await bcrypt.compare(
        userLoginDto.password,
        user.password
      );

      if (!passwordMatch) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(email: string) {
    try {
      const user = await prisma.users.delete({
        where: { email },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  static async addVet(
    verifyVetDto: VerifyVetDto,
    file_path: string,
    userEmail: string
  ) {
    try {
      const createVet = await prisma.vets.create({
        data: {
          user_email: userEmail,
          name: verifyVetDto.name,
          hospital_name: verifyVetDto.hospitalName,
          description: verifyVetDto.description,
          region: verifyVetDto.region,
          img_path: file_path,
        },
      });
      return createVet;
    } catch (Error) {
      throw Error;
    }
  }

  static async getUser(email: string) {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });

      const vet = await prisma.vets.findFirst({
        where: { user_email: email },
      });

      return { user, vet };
    } catch (err) {
      throw err;
    }
  }

  static async setUser(email: string, updatedFields: Partial<UserDto>) {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("유저 정보가 없습니다.");
      }

      if (updatedFields.password) {
        const hashedPassword = await bcrypt.hash(updatedFields.password, 10);
        user.password = hashedPassword;
      }
      if (updatedFields.nickname) user.nickname = updatedFields.nickname;
      if (updatedFields.img_path) user.img_path = updatedFields.img_path;

      user.updated_at = currentDate;

      const updateUser = await prisma.users.update({
        where: {
          email,
        },
        data: user,
      });

      return updateUser;
    } catch (Error) {
      throw Error;
    }
  }

  static async setVet(email: string, updatedFields: Partial<VetDto>) {
    try {
      const vet = await prisma.vets.findFirst({
        where: { user_email: email },
      });

      if (!vet) {
        throw new Error("수의사 정보가 없습니다.");
      }
      if (updatedFields.hospitalName)
        vet.hospital_name = updatedFields.hospitalName;
      if (updatedFields.description)
        vet.description = updatedFields.description;
      if (updatedFields.region) vet.region = updatedFields.region;

      vet.updated_at = currentDate;

      const updateVet = await prisma.vets.update({
        where: { id: vet.id },
        data: vet,
      });

      return updateVet;
    } catch (Error) {
      throw Error;
    }
  }

  static async getUserPost(
    email: string,
    currentPage: number,
    rowPerPage: number
  ) {
    try {
      const startIndex = (currentPage - 1) * rowPerPage;
      const postList = await prisma.posts.findMany({
        where: { author_email: email, deleted_at: null },
        skip: startIndex,
        take: rowPerPage,
      });

      const totalPostsCnt = await prisma.posts.count({
        where: { author_email: email, deleted_at: null },
      });

      return { postList, totalPostsCnt };
    } catch (err) {
      throw err;
    }
  }

  static async deleteVet(email: string) {
    try {
      const result = await prisma.vets.deleteMany({
        where: { user_email: email, status: "rejected" },
      });

      if (result.count === 0) {
        throw new Error("해당 수의사 정보는 존재하지 않습니다.");
      }
    } catch (err) {
      throw err;
    }
  }
}

export { UserService };
