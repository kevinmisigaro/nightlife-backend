-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "club_id" INTEGER NOT NULL,
    "entrance_fee" INTEGER,
    "description" TEXT,
    "event_image" TEXT NOT NULL,
    "event_video" TEXT,
    "headliner" TEXT,
    "alcohol_price" INTEGER,
    "active" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "entrance_fee" INTEGER,
    "description" TEXT,
    "alcohol_price" INTEGER,
    "location" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL,
    "current_location" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "follower_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAttendants" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "attendant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubAttendants" (
    "id" SERIAL NOT NULL,
    "club_id" INTEGER NOT NULL,
    "attendant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_club_id_unique" ON "Event"("club_id");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventAttendants_event_id_unique" ON "EventAttendants"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "EventAttendants_attendant_id_unique" ON "EventAttendants"("attendant_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClubAttendants_club_id_unique" ON "ClubAttendants"("club_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClubAttendants_attendant_id_unique" ON "ClubAttendants"("attendant_id");

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendants" ADD FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendants" ADD FOREIGN KEY ("attendant_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubAttendants" ADD FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubAttendants" ADD FOREIGN KEY ("attendant_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
