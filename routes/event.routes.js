const express = require('express')
const urlRoutes = express.Router()

const controller = require('../controllers/event.controller')

urlRoutes.get('/', controller.getAllEvents)
urlRoutes.post('/create', controller.createEvent)