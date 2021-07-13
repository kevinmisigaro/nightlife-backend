const express = require('express')
const urlRoutes = express.Router()

const controller = require('../controllers/club.controller')

urlRoutes.get('/', controller.getAllClubs )

module.exports = urlRoutes