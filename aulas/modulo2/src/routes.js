const express = require('express')
const Router = express.Router()
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const messageMiddleware = require('./app/middlewares/message')

Router.use(messageMiddleware)

Router.get('/', guestMiddleware, SessionController.create)
Router.post('/signin', SessionController.store)

Router.get('/signup', guestMiddleware, UserController.create)
Router.post('/signup', upload.single('avatar'), UserController.store)

Router.use('/app', authMiddleware)
Router.get('/app/logout', SessionController.destroy)

Router.get('/app/dashboard', DashboardController.index)
Router.get('/files/:file', FileController.show)

Router.get('/app/appointments/new/:provider', AppointmentController.create)
Router.post('/app/appointments/new/:provider', AppointmentController.store)
Router.get('/app/available/:provider', AvailableController.index)

module.exports = Router
