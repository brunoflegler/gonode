const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    mongoose.connect(
      `mongodb://${databaseConfig.uri.host}:${databaseConfig.uri.port}/${
        databaseConfig.uri.database
      }`,
      databaseConfig.options
    )
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express

// docker run --name mongodb -p27017:27017 -d -t mongo
