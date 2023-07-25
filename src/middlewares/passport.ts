import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../users/services/userService";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UserService.loginUser({ email, password });

        if (!user) {
          return done(null, false, {
            message: "해당 이메일은 가입 내역이 없습니다.",
          });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, {
            message: "비밀번호가 일치하지 않습니다.",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT 전략(JWT Strategy) 설정
passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY || "jwt-secret-key",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwtPayload, done) => {
      // 토큰으로 찾은 email 전달
      try {
        return done(null, jwtPayload.email);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
