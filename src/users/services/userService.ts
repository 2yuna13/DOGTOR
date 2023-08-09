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
import { KORDATE } from "../../utils/constant";
import { UserRepository } from "../repositories/userRepository";

const prisma = new PrismaClient();

class UserService {
  static async addUser(userRegisterDto: UserRegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(userRegisterDto.password, 10);

      const newUser = await UserRepository.createUser(
        userRegisterDto.email,
        hashedPassword,
        userRegisterDto.nickname
      );

      return newUser;
    } catch (err) {
      throw err;
    }
  }

  static async createVerificationCode(email: string) {
    const existingUser = await UserRepository.findUserByEmail(email);

    if (existingUser) {
      return null;
    }

    const verificationCode = sendEmail(email);

    const verification = await UserRepository.createVerificationCode(
      email,
      verificationCode
    );

    return verification;
  }

  static async verifyUserEmail(verifyEmailDto: VerifyEmailDto) {
    try {
      const verificationCode = await UserRepository.findCodeByEmail(
        verifyEmailDto.email
      );

      if (!verificationCode || verificationCode.code !== verifyEmailDto.code) {
        throw new Error("인증 코드가 유효하지 않습니다.");
      }

      await UserRepository.deleteCodeByEmail(verifyEmailDto.email);
      return;
    } catch (err) {
      throw err;
    }
  }

  static async loginUser(userLoginDto: UserLoginDto) {
    try {
      const user = await UserRepository.findUserByEmail(userLoginDto.email);

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
      return await UserRepository.deleteUser(email);
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
      return await UserRepository.createVet(
        userEmail,
        verifyVetDto.name,
        verifyVetDto.hospitalName,
        verifyVetDto.description,
        verifyVetDto.region,
        file_path
      );
    } catch (err) {
      throw err;
    }
  }

  static async getUser(email: string) {
    try {
      const user = await UserRepository.findUserByEmail(email);

      const vet = await UserRepository.findVetByEmail(email);

      return { user, vet };
    } catch (err) {
      throw err;
    }
  }

  static async setUser(email: string, updatedFields: Partial<UserDto>) {
    try {
      const user = await UserRepository.findUserByEmail(email);

      if (!user) {
        throw new Error("유저 정보가 없습니다.");
      }

      if (updatedFields.password) {
        const hashedPassword = await bcrypt.hash(updatedFields.password, 10);
        user.password = hashedPassword;
      }
      if (updatedFields.nickname) user.nickname = updatedFields.nickname;
      if (updatedFields.img_path) user.img_path = updatedFields.img_path;
      user.updated_at = new Date(Date.now() + KORDATE);

      const updateUser = await UserRepository.updateUserByEmail(user);

      return updateUser;
    } catch (err) {
      throw err;
    }
  }

  static async setVet(email: string, updatedFields: Partial<VetDto>) {
    try {
      const vet = await UserRepository.findVetByEmail(email);

      if (!vet) {
        throw new Error("수의사 정보가 없습니다.");
      }
      if (updatedFields.hospitalName)
        vet.hospital_name = updatedFields.hospitalName;
      if (updatedFields.description)
        vet.description = updatedFields.description;
      if (updatedFields.region) vet.region = updatedFields.region;
      vet.updated_at = new Date(Date.now() + KORDATE);

      const updateVet = await UserRepository.updateVetByEmail(vet);

      return updateVet;
    } catch (err) {
      throw err;
    }
  }

  static async getUserPost(
    email: string,
    currentPage: number,
    rowPerPage: number
  ) {
    try {
      const startIndex = (currentPage - 1) * rowPerPage;
      const postList = await UserRepository.findPostByEmail(
        email,
        startIndex,
        rowPerPage
      );

      const totalPostsCnt = await UserRepository.countPostsByEmail(email);

      return { postList, totalPostsCnt };
    } catch (err) {
      throw err;
    }
  }

  static async deleteVet(email: string) {
    try {
      const result = await UserRepository.deleteVet(email);

      if (result.count === 0) {
        throw new Error("해당 수의사 정보는 존재하지 않습니다.");
      }
    } catch (err) {
      throw err;
    }
  }
}

export { UserService };
