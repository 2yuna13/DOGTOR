/*
  Warnings:

  - You are about to drop the column `content` on the `chat_contents` table. All the data in the column will be lost.
  - Added the required column `message` to the `chat_contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chat_contents` DROP COLUMN `content`,
    ADD COLUMN `message` TEXT NOT NULL;
