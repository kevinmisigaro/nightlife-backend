const express = require('express')
const urlRoutes = express.Router()

const controller = require('../controllers/user.controller')

urlRoutes.post('/create', controller.registerUser)
urlRoutes.patch('/status/:id', controller.changeStatus)
urlRoutes.delete('/delete/:id', controller.deleteUser)
urlRoutes.get('/find/:id', controller.findUser)
urlRoutes.patch('/update/:id', controller.updateUser)

module.exports = urlRoutes