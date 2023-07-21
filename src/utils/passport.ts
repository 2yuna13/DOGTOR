import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
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
      // JWT 페이로드를 기반으로 유저 정보를 가져오는 로직이 필요합니다.
      // 예를 들어, 유저 아이디를 기반으로 데이터베이스에서 유저를 찾는 등의 작업이 여기서 이루어집니다.
      try {
        const user = await prisma.users.findUnique({
          where: { email: jwtPayload.email },
        });

        if (!user) {
          return done(null, false, { message: "인증 실패" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GMAIL_OAUTH_CLIENT_ID,
      clientSecret: process.env.GAMIL_OAUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any, info?: any) => void
    ) => {
      try {
        const email = profile.emails?.[0].value || "";

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (user) {
          return done(null, user);
        }

        const newUser = await prisma.users.create({
          data: {
            email,
            password: "",
            nickname: profile.displayName || "",
            role: "user",
            user_type: "google",
            created_at: new Date(),
            updated_at: new Date(),
          },
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
