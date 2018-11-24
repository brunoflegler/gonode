const express = require('express')
const Router = express.Router()
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

Router.get('/', guestMiddleware, SessionController.create)
Router.post('/signin', SessionController.store)

Router.get('/signup', guestMiddleware, UserController.create)
Router.post('/signup', upload.single('avatar'), UserController.store)

Router.use('/app', authMiddleware)
Router.get('/app/logout', SessionController.destroy)

Router.get('/app/dashboard', (req, res) => {
  return res.render('dashboard')
})

module.exports = Router
