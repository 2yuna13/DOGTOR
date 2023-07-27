import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function PermissionValidation(role: string): RequestHandler {
  return async (req, res, next) => {
    try {
      const user = await prisma.users.findUnique({
        where: { email: req.user as string },
      });
      if (user?.role == role) {
        next();
      } else {
        res.status(401).json({ message: "권한이 없습니다." });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}
