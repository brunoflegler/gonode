'use strict'

const Model = use('Model')

class Event extends Model {
  static get dates () {
    return super.dates.concat(['date_event'])
  }
}

module.exports = Event
