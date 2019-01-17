'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.create('events', table => {
      table.increments()
      table.string('title').notNullable()
      table
        .timestamp('date_event', { useTz: false })
        .defaultTo(this.fn.now())
        .notNullable()
      table.string('location').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamps()
      table.unique(['title', 'date_event'])
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventsSchema
