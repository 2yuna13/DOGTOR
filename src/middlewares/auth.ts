import jwt from "jsonwebtoken";

export function generateToken(user: any) {
  const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
  const token = jwt.sign({ email: user.email }, secretKey);
  return token;
}
