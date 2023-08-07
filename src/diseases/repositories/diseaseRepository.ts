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
      });
    } catch (error) {
      throw error;
    }
  }
}

export { DiseaseRepository };
