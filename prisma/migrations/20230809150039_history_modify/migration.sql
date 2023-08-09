/*
  Warnings:

  - You are about to drop the column `group` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `indent` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `comments` table. All the data in the column will be lost.
  - The values [completed] on the enum `reports_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `hospitals` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `group`,
    DROP COLUMN `indent`,
    DROP COLUMN `order`;

-- AlterTable
ALTER TABLE `reports` MODIFY `status` ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `users` MODIFY `img_path` VARCHAR(255) NULL DEFAULT 'imgs\users\profile.png';

-- DropTable
DROP TABLE `hospitals`;
