import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { UserService } from "../users/services/userService";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "./auth";
import { KORDATE } from "../utils/constant";

const prisma = new PrismaClient();

passport.serializeUser((user: any, done) => {
  done(null, user.email);
});

passport.deserializeUser((id: any, done) => {
  done(null, id);
});

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GMAIL_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GAMIL_OAUTH_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGlE_CALLBACK || "",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile,
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
            img_path: null,
            created_at: new Date(Date.now() + KORDATE),
            updated_at: new Date(Date.now() + KORDATE),
          },
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_APIKEY || "",
      callbackURL: process.env.KAKAO_CALLBACK || "",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile,
      done: (error: any, user?: any, info?: any) => void
    ) => {
      try {
        const email = profile._json.kakao_account.email || "";
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
            user_type: "kakao",
            img_path: null,
            created_at: new Date(Date.now() + KORDATE),
            updated_at: new Date(Date.now() + KORDATE),
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
