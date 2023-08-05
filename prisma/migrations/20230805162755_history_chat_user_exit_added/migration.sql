-- AlterTable
ALTER TABLE `chat_rooms` ADD COLUMN `is_user_exit` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_vet_exit` BOOLEAN NOT NULL DEFAULT false;
