'use strict'

const Antl = use('Antl')

class Event {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      location: 'required',
      date_event: `required|date|after:${new Date()}`
    }
  }

  get messages () {
    return Antl.forLocale('pt').list('validation')
  }
}

module.exports = Event
