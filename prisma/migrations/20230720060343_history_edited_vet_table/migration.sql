/*
  Warnings:

  - You are about to drop the column `region` on the `vets` table. All the data in the column will be lost.
  - Added the required column `description` to the `vets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vets` DROP COLUMN `region`,
    ADD COLUMN `description` VARCHAR(255) NOT NULL;
