const prismaClient = require('@prisma/client')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const prisma = new prismaClient.PrismaClient()

//get all clubs
exports.getAllClubs = async (req, res) => {
    const allClubs = await prisma.club.findMany()
    res.status(200).json(allClubs)
}

//create new club
exports.createClub = async (req, res) => {

    let avatar;

    if(req.files){
        avatar = req.files.image
        avatar.mv('/uploads/club/' + avatar.name)
    }

    const createdClub = await prisma.club.create({
        data: {
            name: req.body.name,
            entrance_fee: Number(req.body.fee),
            description: req.body.description,
            alcohol_price: Number(req.body.alcohol_price),
            location: req.body.location,
            created_at: Number(moment().valueOf()),
            image: !req.files ? null : `/uploads/club/${avatar.name}`
        }
    })

    if(!createdClub){
        res.status(404).json({message: "Failed to create club"})
    } else{  
        res.status(201).json({message: "Club created"})
    }
    
}