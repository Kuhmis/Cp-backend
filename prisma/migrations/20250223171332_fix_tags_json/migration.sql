/*
  Warnings:

  - Added the required column `questions` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `template` ADD COLUMN `questions` JSON NOT NULL,
    ADD COLUMN `tags` JSON NOT NULL,
    ADD COLUMN `topic` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;
