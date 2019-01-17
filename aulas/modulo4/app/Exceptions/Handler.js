'use strict'

const Sentry = require('raven')
const Config = use('Config')
const Youch = use('Youch')
const Env = use('Env')

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJson = await youch.toJSON()
      return response.status(error.status).send(errorJson)
    }
    return response.status(error.status)
  }

  async report (error) {
    Sentry.config({ dsn: Config.get('sentry.dsn') })
    Sentry.captureException(error)
  }
}

module.exports = ExceptionHandler
