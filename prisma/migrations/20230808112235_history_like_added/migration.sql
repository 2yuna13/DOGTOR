-- CreateTable
CREATE TABLE `likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `author_email` VARCHAR(255) NOT NULL,
    `is_like` BOOLEAN NOT NULL DEFAULT true,

    INDEX `FK_likes_posts`(`post_id`),
    INDEX `FK_likes_users`(`author_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `FK_likes_posts` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `FK_likes_users` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;
