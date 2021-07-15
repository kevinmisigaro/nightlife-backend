/*
  Warnings:

  - You are about to drop the `ClubAttendants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventAttendants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubAttendants" DROP CONSTRAINT "ClubAttendants_attendant_id_fkey";

-- DropForeignKey
ALTER TABLE "ClubAttendants" DROP CONSTRAINT "ClubAttendants_club_id_fkey";

-- DropForeignKey
ALTER TABLE "EventAttendants" DROP CONSTRAINT "EventAttendants_attendant_id_fkey";

-- DropForeignKey
ALTER TABLE "EventAttendants" DROP CONSTRAINT "EventAttendants_event_id_fkey";

-- DropTable
DROP TABLE "ClubAttendants";

-- DropTable
DROP TABLE "EventAttendants";

-- DropTable
DROP TABLE "Friends";

-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "follower_id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAttendant" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "attendant_id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubAttendant" (
    "id" SERIAL NOT NULL,
    "club_id" INTEGER NOT NULL,
    "attendant_id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventAttendant_event_id_unique" ON "EventAttendant"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "EventAttendant_attendant_id_unique" ON "EventAttendant"("attendant_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClubAttendant_club_id_unique" ON "ClubAttendant"("club_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClubAttendant_attendant_id_unique" ON "ClubAttendant"("attendant_id");

-- AddForeignKey
ALTER TABLE "EventAttendant" ADD FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendant" ADD FOREIGN KEY ("attendant_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubAttendant" ADD FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubAttendant" ADD FOREIGN KEY ("attendant_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
