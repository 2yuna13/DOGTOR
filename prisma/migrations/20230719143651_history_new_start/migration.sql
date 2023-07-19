-- CreateTable
CREATE TABLE `chat_contents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chat_room_id` INTEGER NOT NULL,
    `is_from_user` BOOLEAN NOT NULL,
    `from_id` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `FK_chat_contents_chat_rooms`(`chat_room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(255) NOT NULL,
    `user_vet_email` VARCHAR(255) NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected', 'completed') NOT NULL,
    `grade` FLOAT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `FK_chat_rooms_users`(`user_email`),
    INDEX `FK_chat_rooms_users_2`(`user_vet_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `group` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `indent` INTEGER NOT NULL,
    `author_email` VARCHAR(255) NOT NULL,
    `body` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `FK_comments_posts`(`post_id`),
    INDEX `FK_comments_users`(`author_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospitals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `contact` VARCHAR(255) NULL,
    `locate_x` FLOAT NULL,
    `locate_y` FLOAT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_email` VARCHAR(255) NOT NULL,
    `category` ENUM('free', 'info') NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `body` TEXT NOT NULL,
    `like` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `FK_posts_users`(`author_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profileimages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `mimetype` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `FK_profileimages_users`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report_comments` (
    `comment_id` INTEGER NOT NULL,
    `report_id` INTEGER NOT NULL,

    INDEX `FK_report_comments_reports`(`report_id`),
    PRIMARY KEY (`comment_id`, `report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report_posts` (
    `post_id` INTEGER NOT NULL,
    `report_id` INTEGER NOT NULL,

    INDEX `FK_report_posts_reports`(`report_id`),
    PRIMARY KEY (`post_id`, `report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_email` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected', 'completed') NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `FK_reports_users`(`author_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(255) NOT NULL,
    `role` ENUM('vet', 'admin', 'user') NOT NULL,
    `user_type` ENUM('normal', 'kakao', 'google') NOT NULL DEFAULT 'normal',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `blocked_at` DATETIME(0) NULL,
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationCodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `region` VARCHAR(255) NOT NULL,
    `hospital_name` VARCHAR(255) NOT NULL,
    `img_path` VARCHAR(255) NOT NULL,
    `chat_count` INTEGER NULL,
    `grade` FLOAT NULL,
    `status` ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `FK_vets_users`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chat_contents` ADD CONSTRAINT `FK_chat_contents_chat_rooms` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_rooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat_rooms` ADD CONSTRAINT `FK_chat_rooms_users` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `chat_rooms` ADD CONSTRAINT `FK_chat_rooms_users_2` FOREIGN KEY (`user_vet_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `FK_comments_posts` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `FK_comments_users` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `FK_posts_users` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profileimages` ADD CONSTRAINT `FK_profileimages_users` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report_comments` ADD CONSTRAINT `FK_report_comments_comments` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report_comments` ADD CONSTRAINT `FK_report_comments_reports` FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report_posts` ADD CONSTRAINT `FK_report_posts_posts` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `report_posts` ADD CONSTRAINT `FK_report_posts_reports` FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `FK_reports_users` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vets` ADD CONSTRAINT `FK_vets_users` FOREIGN KEY (`user_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;
