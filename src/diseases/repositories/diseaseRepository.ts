import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DiseaseRepository {
  static async findTopVets() {
    try {
      return await prisma.vets.findMany({
        orderBy: {
          grade: "desc",
        },
        take: 5,
        include: {
          users: {
            select: { img_path: true },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export { DiseaseRepository };
