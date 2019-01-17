const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const Router = express.Router()

const controllers = require('./app/controllers')
const validators = require('./app/validators')

const authMiddleware = require('./app/middlewares/auth')

Router.post(
  '/users',
  validate(validators.User),
  controllers.UserController.store
)
Router.post(
  '/sessions',
  validate(validators.Session),
  controllers.SessionController.store
)

Router.use(authMiddleware)

Router.get('/ads', controllers.AdController.index)
Router.get('/ads/:id', handle(controllers.AdController.show))
Router.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
Router.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
Router.delete('/ads/:id', handle(controllers.AdController.destroy))

Router.get('/purchases', controllers.PurchaseController.index)

Router.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

Router.put('/purchases/accept/:id', controllers.AcceptController.accept)

module.exports = Router
