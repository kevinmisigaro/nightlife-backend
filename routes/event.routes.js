const express = require('express')
const urlRoutes = express.Router()

const controller = require('../controllers/event.controller')

urlRoutes.get('/', controller.getAllEvents)
urlRoutes.post('/create', controller.createEvent)
urlRoutes.get('/find/:id', controller.findEvent)
urlRoutes.delete('/delete/:id', controller.deleteEvent)
urlRoutes.patch('/status/:id', controller.changeStatus)
urlRoutes.post('/attend', controller.userAtEvent)

module.exports = urlRoutes