/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_image" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.phone_unique" ON "User"("phone");
