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
      created_at: Number(moment().valueOf()),
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
};

//get all Events
exports.getAllEvents = async (req, res) => {
  const allEvents = await prisma.event.findMany();
  res.status(200).json(allEvents);
};

//read one event
exports.findEvent = async (req, res) => {
  const { id } = req.params;

  const singleEvent = await prisma.event.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!singleEvent || singleEvent.length == 0) {
    res.status(404).json({
      message: "Event not found",
    });
  } else {
    res.status(200).json(singleEvent);
  }
};

//delete event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  const deletedEvent = await prisma.event.delete({
    where: {
      id: Number(id),
    },
  });

  if (!deletedEvent || deletedEvent.length == 0) {
    res.status(404).json({
      message: "Event not found",
    });
  } else {
    res.status(202).json({
      message: "Event deleted",
    });
  }
};

//change status of event
exports.changeStatus = async (req, res) => {
  const {
      id
  } = req.params

  const eventToUpdate = await prisma.event.findFirst({
      where: {
          id: Number(id),
      },
  })

  const updatedEvent = await prisma.event.update({
      where: {
          id: eventToUpdate.id
      },
      data: {
          active: eventToUpdate.active ? false : true
      }
  })

  if (!updatedEvent || updatedEvent.length == 0) {
      res.status(404).json({
          message: "Failed to update event"
      })
  } else {
      res.status(301).json(updatedEvent)
  }
}

exports.userAtEvent = async (req, res) => {
  const attendant = await prisma.eventAttendants.create({
    data: {
      event_id: req.body.event_id,
      attendant_id: req.body.user_id,
      created_at: moment().valueOf()
    }
  })

  if(!attendant){
    res.status(404).json({message:"Failed to confirm attendance"})
  } else{
    res.status(201).json({message:"Attendance confirmed"})
  }
}
