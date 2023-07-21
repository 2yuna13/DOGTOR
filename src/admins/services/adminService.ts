import { PrismaClient } from "@prisma/client";
import { VetListDto, VetStatusDto } from "../dtos/adminDto";

const prisma = new PrismaClient();

class AdminService {
  static async getVetRequestLists(vetListsDto: VetListDto) {
    try {
      const vetRequests = await prisma.vets.findMany({
        where: {
          status: vetListsDto.status,
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
