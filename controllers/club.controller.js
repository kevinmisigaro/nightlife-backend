const prismaClient = require('@prisma/client')
const express = require('express')

const app = express()

const prisma = new prismaClient.PrismaClient()

exports.getAllClubs = async (req, res) => {
    const allClubs = await prisma.club.findMany()

    res.status(200).json(allClubs)
}