'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.store').validator('User')
Route.post('/sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.put(
    '/users/changePassword',
    'ChangePasswordController.update'
  ).validator('ChangePassword')

  Route.put('/users', 'UserController.update').validator('ChangePassword')
  Route.get('/events', 'EventController.index')
  Route.post('/events', 'EventController.store').validator('Event')
  Route.put('/events/:id', 'EventController.update').validator('Event')
  Route.delete('/events/:id', 'EventController.destroy')

  Route.resource('events.share', 'ShareEventController').only(['store'])
}).middleware(['auth'])
