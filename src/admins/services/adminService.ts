import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AdminService {
  static async getVetRequestsPending() {
    try {
      const vetRequests = await prisma.vets.findMany({
        where: {
          status: "pending",
        },
        orderBy: {
          updated_at: "asc",
        },
      });
      return vetRequests;
    } catch (error) {
      throw error;
    }
  }

  static async getVetRequestsAccepted() {
    try {
      const vetRequests = await prisma.vets.findMany({
        where: {
          status: "accepted",
        },
        orderBy: {
          updated_at: "asc",
        },
      });
      return vetRequests;
    } catch (error) {
      throw error;
    }
  }
}

export { AdminService };
