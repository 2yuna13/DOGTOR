/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `nickname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `username`,
    ADD COLUMN `nickname` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `verificationCodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `verificationCodes` ADD CONSTRAINT `FK_verificationCodes_users` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;
