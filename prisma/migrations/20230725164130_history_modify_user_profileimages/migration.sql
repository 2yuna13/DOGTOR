/*
  Warnings:

  - You are about to drop the `profileimages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `img_path` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profileimages` DROP FOREIGN KEY `FK_profileimages_users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `img_path` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `profileimages`;
