import "dotenv/config";
import nodemailer from "nodemailer";
import { CODE_CHARACTERS, CODE_LENGTH } from "./constant";

const generateVerificationCode = () => {
  const codeLength = CODE_LENGTH; // 인증 코드 길이
  const characters = CODE_CHARACTERS; // 인증 코드로 사용할 문자 집합
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_OAUTH_USER,
    clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
    clientSecret: process.env.GAMIL_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.GAMIL_OAUTH_REFRESH_TOKEN,
  },
});

export function sendEmail(email: string) {
  const verificationCode = generateVerificationCode();
  transporter.sendMail({
    to: email,
    subject: "[dogtor] 회원가입 이메일 인증 메일입니다.",
    html: `인증 코드: <strong>${verificationCode}</strong>를 사용하여 회원가입을 완료해주세요.`,
  });
  return verificationCode;
}
