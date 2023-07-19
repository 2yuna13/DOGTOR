import { connection } from "../../app";
import { logger } from "../../utils/winston";
import { PrismaClient } from "@prisma/client";
import {
  UserDto,
  VerifyCodeDto,
  VerifyEmailDto,
  VerifyVetDto,
} from "../dtos/userDto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import config from "../../utils/config";

const prisma = new PrismaClient();

const generateVerificationCode = () => {
  const codeLength = 6; // 인증 코드 길이
  const characters = "0123456789"; // 인증 코드로 사용할 문자 집합

  let code = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};

class UserService {
  static async addUser(userDto: UserDto) {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);

      const createUser = await prisma.users.create({
        data: {
          email: userDto.email,
          password: hashedPassword,
          nickname: userDto.nickname,
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

  static async createVerificationCode(verifyCodeDto: VerifyCodeDto) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        type: "OAuth2",
        user: config.mailer.gmailUser,
        clientId: config.mailer.gmailClientId,
        clientSecret: config.mailer.gmailClientSecret,
        refreshToken: config.mailer.gmailRefreshToken,
      },
    });

    const verificationCode = generateVerificationCode();

    const mailOptions = {
      to: verifyCodeDto.email,
      subject: "[dogto] 회원가입 이메일 인증 메일입니다.",
      html: `인증 코드: <strong>${verificationCode}</strong>를 사용하여 회원가입을 완료해주세요.`,
    };

    await transporter.sendMail(mailOptions);

    const verification = await prisma.verificationCodes.create({
      data: {
        email: verifyCodeDto.email,
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

  static async getUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error("해당 이메일은 가입 내역이 없습니다.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
      const token = jwt.sign({ email: user.email }, secretKey);

      const loginUser = {
        email: user.email,
        nickname: user.nickname,
        token: token,
      };

      return loginUser;
    } catch (err) {
      throw err;
    }
  }

  static async addVet(verifyVetDto: VerifyVetDto) {
    try {
      const createVet = await prisma.vets.create({
        data: {
          user_email: verifyVetDto.userEmail,
          name: verifyVetDto.name,
          region: verifyVetDto.region,
          hospital_name: verifyVetDto.hospitalName,
          img_path: verifyVetDto.imgPath,
        },
      });
      return createVet;
    } catch (Error) {
      throw Error;
    }
  }
}

export { UserService };
