import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function generateToken(user: any) {
  const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  const token = jwt.sign({ email: user.email }, secretKey);
  return token;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? null;
    if (userToken !== null) {
      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
      const jwtDecoded = jwt.verify(userToken, secretKey) as JwtPayload;
      req.user = jwtDecoded.email;
    }

    next();
  } catch (error) {
    res.status(401).send({ error: "잘못된 토큰입니다." });
    return;
  }
}
