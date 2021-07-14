const prismaClient = require("@prisma/client");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const prisma = new prismaClient.PrismaClient();

//create Event
exports.createEvent = async (req, res) => {
    let avatar;

    if (req.files) {
      avatar = req.files.image;
      avatar.mv("/uploads/event/" + avatar.name);
    }

    const createdEvent = await prisma.event.create({
        data: {
          event_date: Number(req.body.date),
          club_id: Number(req.body.club_id),
          entrance_fee: Number(req.body.fee),
          description: req.body.description,
          event_image: !req.files ? null : `/uploads/event/${avatar.name}`,
          headliner: req.body.headliner,
          alcohol_price: req.body.alcohol_price,
          created_at: Number(moment().valueOf())
        },
      });
    
      if (!createdEvent) {
        res.status(404).json({
          message: "Failed to create Event",
        });
      } else {
        res.status(201).json({
          message: "Event created",
        });
      }
}

//get all Events
exports.getAllEvents = async (req, res) => {
    const allEvents = await prisma.event.findMany();
    res.status(200).json(allEvents);
}