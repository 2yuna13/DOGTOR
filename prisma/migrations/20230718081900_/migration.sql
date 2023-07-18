/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `verificationcodes` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `verificationcodes` table. All the data in the column will be lost.
  - Added the required column `email` to the `verificationCodes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `verificationcodes` DROP FOREIGN KEY `FK_verificationCodes_users`;

-- AlterTable
ALTER TABLE `verificationcodes` DROP COLUMN `updatedAt`,
    DROP COLUMN `user_email`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
