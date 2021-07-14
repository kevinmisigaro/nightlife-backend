/*
  Warnings:

  - Changed the type of `created_at` on the `Club` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_at` on the `ClubAttendants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_date` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_at` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_at` on the `EventAttendants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_at` on the `Friends` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_at` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ClubAttendants" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_date",
ADD COLUMN     "event_date" INTEGER NOT NULL,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EventAttendants" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Friends" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER NOT NULL;
