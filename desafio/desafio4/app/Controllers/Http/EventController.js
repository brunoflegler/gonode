'use strict'

const Event = use('App/Models/Event')
const moment = require('moment')

class EventController {
  async index ({ request, auth }) {
    const { start, end } = request.get()
    const query = Event.query()

    if (start) {
      console.log(moment(parseInt(start)).format('YYYY-MM-DD HH:mm:ss'))
      query.where(
        'date_event',
        '>=',
        moment(parseInt(start)).format('YYYY-MM-DD HH:mm:ss')
      )
    }

    if (end) {
      console.log(moment(parseInt(end)).format('YYYY-MM-DD HH:mm:ss'))
      query.where(
        'date_event',
        '<=',
        moment(parseInt(end)).format('YYYY-MM-DD HH:mm:ss')
      )
    }

    query.where('user_id', auth.user.id)

    const events = await query.fetch()
    return events
  }

  async store ({ request, auth }) {
    const data = request.all()
    const event = await Event.create({ ...data, user_id: auth.user.id })
    return event
  }

  async update ({ response, request, auth, params }) {
    const data = request.all()
    const event = await Event.query()
      .where('id', params.id)
      .where('user_id', auth.user.id)
      .where('date_event', '>=', new Date())
      .first()

    if (!event) {
      return response.status(400).send({
        error: { message: 'Não é possivel alterar um evento que já passou' }
      })
    }

    await event.merge(data)
    await event.save()
    return event
  }

  async destroy ({ response, params, auth }) {
    const event = await Event.query()
      .where('id', params.id)
      .where('user_id', auth.user.id)
      .where('date_event', '>=', new Date())
      .first()

    if (!event) {
      return response.status(400).send({
        error: { message: 'Não é possivel excluir um evento que já passou' }
      })
    }

    await event.delete()
  }
}

module.exports = EventController
