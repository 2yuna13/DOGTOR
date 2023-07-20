-- AlterTable
ALTER TABLE `chat_rooms` MODIFY `status` ENUM('pending', 'accepted', 'rejected', 'completed') NOT NULL DEFAULT 'pending';
