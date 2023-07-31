-- DropForeignKey
ALTER TABLE `chat_contents` DROP FOREIGN KEY `FK_chat_contents_chat_rooms`;

-- DropForeignKey
ALTER TABLE `chat_rooms` DROP FOREIGN KEY `FK_chat_rooms_users`;

-- DropForeignKey
ALTER TABLE `chat_rooms` DROP FOREIGN KEY `FK_chat_rooms_users_2`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `FK_comments_posts`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `FK_comments_users`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `FK_posts_users`;

-- DropForeignKey
ALTER TABLE `report_comments` DROP FOREIGN KEY `FK_report_comments_comments`;

-- DropForeignKey
ALTER TABLE `report_comments` DROP FOREIGN KEY `FK_report_comments_reports`;

-- DropForeignKey
ALTER TABLE `report_posts` DROP FOREIGN KEY `FK_report_posts_posts`;

-- DropForeignKey
ALTER TABLE `report_posts` DROP FOREIGN KEY `FK_report_posts_reports`;

-- DropForeignKey
ALTER TABLE `reports` DROP FOREIGN KEY `FK_reports_users`;

-- DropForeignKey
ALTER TABLE `vets` DROP FOREIGN KEY `FK_vets_users`;

-- AlterTable
ALTER TABLE `comments` MODIFY `group` INTEGER NULL,
    MODIFY `order` INTEGER NULL,
    MODIFY `indent` INTEGER NULL;

-- AlterTable
ALTER TABLE `reports` MODIFY `status` ENUM('pending', 'accepted', 'rejected', 'completed') NOT NULL DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE `chat_contents` ADD CONSTRAINT `FK_chat_contents_chat_rooms` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_rooms`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat_rooms` ADD CONSTRAINT `FK_chat_rooms_users` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat_rooms` ADD CONSTRAINT `FK_chat_rooms_users_2` FOREIGN KEY (`user_vet_email`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `FK_comments_posts` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `FK_comments_users` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `FK_posts_users` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report_comments` ADD CONSTRAINT `FK_report_comments_comments` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report_comments` ADD CONSTRAINT `FK_report_comments_reports` FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report_posts` ADD CONSTRAINT `FK_report_posts_posts` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report_posts` ADD CONSTRAINT `FK_report_posts_reports` FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `FK_reports_users` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vets` ADD CONSTRAINT `FK_vets_users` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;
