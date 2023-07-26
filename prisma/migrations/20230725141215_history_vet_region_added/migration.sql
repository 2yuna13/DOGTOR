/*
  Warnings:

  - Added the required column `region` to the `vets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vets` ADD COLUMN `region` ENUM('Seoul', 'Gyeonggi', 'Incheon', 'Daejeon', 'Daegu', 'Gwangju', 'Ulsan', 'Busan', 'Gangwon', 'Chungcheong', 'Jeolla', 'Gyeongsang', 'Jeju') NOT NULL;
