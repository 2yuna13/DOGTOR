import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../users/services/userService";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "./auth";

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
        const token = generateToken(user);
        return done(null, token);
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
