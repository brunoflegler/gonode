const express = require('express')
const Router = express.Router()

const controllers = require('./app/controllers')

const authMiddleware = require('./app/middlewares/auth')

Router.post('/users', controllers.UserController.store)
Router.post('/sessions', controllers.SessionController.store)

Router.use(authMiddleware)

Router.get('/ads', controllers.AdController.index)
Router.get('/ads/:id', controllers.AdController.show)
Router.post('/ads', controllers.AdController.store)
Router.put('/ads/:id', controllers.AdController.update)
Router.delete('/ads/:id', controllers.AdController.destroy)

module.exports = Router
