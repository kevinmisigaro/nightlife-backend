const prismaClient = require("@prisma/client");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const prisma = new prismaClient.PrismaClient();

//get all clubs
exports.getAllClubs = async (req, res) => {
    const allClubs = await prisma.club.findMany();
    res.status(200).json(allClubs);
};

//create new club
exports.createClub = async (req, res) => {
    let avatar;

    if (req.files) {
        avatar = req.files.image;
        avatar.mv("/uploads/club/" + avatar.name);
    }

    const createdClub = await prisma.club.create({
        data: {
            name: req.body.name,
            entrance_fee: Number(req.body.fee),
            description: req.body.description,
            alcohol_price: Number(req.body.alcohol_price),
            location: req.body.location,
            created_at: Number(moment().valueOf()),
            image: !req.files ? null : `/uploads/club/${avatar.name}`,
        },
    });

    if (!createdClub) {
        res.status(404).json({
            message: "Failed to create club"
        });
    } else {
        res.status(201).json({
            message: "Club created"
        });
    }
};

//read club
exports.findClub = async (req, res) => {
    const {
        id
    } = req.params;

    const foundClub = await prisma.club.findFirst({
        where: {
            id: Number(id),
        },
    });

    if (!foundClub || foundClub.length == 0) {
        res.status(404).json({
            message: "Club not found"
        });
    } else {
        res.status(200).json(foundClub);
    }
};

//update Club
exports.updateClub = async (req, res) => {
    const {
        id
    } = req.params;

    let avatar;

    if (req.files) {
        avatar = req.files.image;
        avatar.mv("/uploads/club/" + avatar.name);
    }

    const updatedClub = await prisma.club.update({
        where: {
            id: Number(id),
        },
        data: {
            name: req.body.name,
            entrance_fee: Number(req.body.fee),
            description: req.body.description,
            alcohol_price: Number(req.body.alcohol_price),
            location: req.body.location,
            image: !req.files ? null : `/uploads/club/${avatar.name}`,
        },
    });

    if (!updatedClub || updatedClub.length == 0) {
        res.status(404).json({
            message: "Club not found"
        });
    } else {
        res.status(301).json(updatedClub);
    }
};

//delete club
exports.deleteClub = async (req, res) => {
    const {
        id
    } = req.params;

    const deletedClub = await prisma.club.delete({
        where: {
            id: Number(id)
        },
    });

    if (!deletedClub || deletedClub.length == 0) {
        res.status(404).json({
            message: "Club not found"
        });
    } else {
        res.status(202).json({
            message: "Club deleted"
        });
    }
};

//change status of club
exports.changeStatus = async (req, res) => {
    const {
        id
    } = req.params

    const clubToUpdate = await prisma.club.findFirst({
        where: {
            id: Number(id),
        },
    })

    const updatedClub = await prisma.club.update({
        where: {
            id: clubToUpdate.id
        },
        data: {
            active: clubToUpdate.active ? false : true
        }
    })

    if (!updatedClub || updatedClub.length == 0) {
        res.status(404).json({
            message: "Failed to update club"
        })
    } else {
        res.status(301).json(updatedClub)
    }
}

exports.userAtClub = async (req, res) => {
    const attendant = await prisma.clubAttendants.create({
      data: {
        club_id: req.body.club_id,
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