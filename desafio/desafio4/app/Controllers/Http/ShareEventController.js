'use strict'

const Event = use('App/Models/Event')
const kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

class ShareEventController {
  async store ({ request, params, auth }) {
    const data = request.only(['email_to'])
    const { title } = await Event.findOrFail(params.events_id)

    kue.dispatch(
      Job.key,
      { email: data.email_to, username: auth.user.username, title },
      { attempts: 3 }
    )
  }
}

module.exports = ShareEventController
