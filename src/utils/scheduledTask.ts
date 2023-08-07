import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { logger } from "./winston";
const prisma = new PrismaClient();

async function updateBlockedAt(): Promise<void> {
  const currentDate: Date = new Date();

  try {
    const updatedUsers = await prisma.users.updateMany({
      where: {
        blocked_at: {
          lt: currentDate,
        },
      },
      data: { blocked_at: null },
    });

    logger.info(
      `${updatedUsers.count} users' blocked_at updated successfully.`
    );
  } catch (error) {
    console.error("Error updating blocked_at:", error);
  }
}

cron.schedule("0 0 * * *", () => {
  updateBlockedAt();
});

export { updateBlockedAt };
