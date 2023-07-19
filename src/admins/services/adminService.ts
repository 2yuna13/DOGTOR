import { PrismaClient } from "@prisma/client";
import { VetStatusDto } from "../dtos/adminDto";

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

  static async manageVetRequests(vetStatusDto: VetStatusDto) {
    try {
      const updateVet = await prisma.vets.update({
        where: {
          id: vetStatusDto.id,
        },
        data: {
          status: vetStatusDto.status,
        },
      });
      if (updateVet.status == "accepted") {
        await prisma.users.update({
          where: {
            email: vetStatusDto.email,
          },
          data: {
            role: "vet",
          },
        });
      }
      return updateVet;
    } catch (error) {
      throw error;
    }
  }
}

export { AdminService };
