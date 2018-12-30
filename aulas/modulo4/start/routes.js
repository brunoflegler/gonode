'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.get('files/:id', 'FileController.show')
  Route.post('files', 'FileController.store').validator('File')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(
      new Map([
        [['projects.store'], ['Project']],
        [['projects.update'], ['Project']]
      ])
    )
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(
      new Map([[['tasks.store'], ['Task']], [['tasks.update'], ['Task']]])
    )
}).middleware(['auth'])
