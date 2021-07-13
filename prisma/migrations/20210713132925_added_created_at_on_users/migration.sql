/*
  Warnings:

  - Added the required column `created_at` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;
