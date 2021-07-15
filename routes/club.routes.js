const express = require('express')
const urlRoutes = express.Router()

const controller = require('../controllers/club.controller')

urlRoutes.get('/', controller.getAllClubs )
urlRoutes.post('/create', controller.createClub)
urlRoutes.get('/find/:id', controller.findClub)
urlRoutes.patch('/update/:id', controller.updateClub)
urlRoutes.patch('/status/:id', controller.changeStatus)
urlRoutes.delete('/delete/:id', controller.deleteClub)
urlRoutes.post('/attend',controller.userAtClub)

module.exports = urlRoutes