/*
  Warnings:

  - You are about to drop the `ClubAttendant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventAttendant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubAttendant" DROP CONSTRAINT "ClubAttendant_attendant_id_fkey";

-- DropForeignKey
ALTER TABLE "ClubAttendant" DROP CONSTRAINT "ClubAttendant_club_id_fkey";

-- DropForeignKey
ALTER TABLE "EventAttendant" DROP CONSTRAINT "EventAttendant_attendant_id_fkey";

-- DropForeignKey
ALTER TABLE "EventAttendant" DROP CONSTRAINT "EventAttendant_event_id_fkey";

-- DropTable
DROP TABLE "ClubAttendant";

-- DropTable
DROP TABLE "EventAttendant";

-- CreateTable
CREATE TABLE "EventAttendants" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER,
    "attendant_id" INTEGER,
    "created_at" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubAttendants" (
    "id" SERIAL NOT NULL,
    "club_id" INTEGER,
    "attendant_id" INTEGER,
    "created_at" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD FOREIGN KEY ("follower_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendants" ADD FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendants" ADD FOREIGN KEY ("attendant_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubAttendants" ADD FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubAttendants" ADD FOREIGN KEY ("attendant_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
