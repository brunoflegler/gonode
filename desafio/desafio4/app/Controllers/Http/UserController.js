'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return user
  }

  async update ({ request, params }) {
    const user = await User.find(params.user.id)
    const data = request.only(['username'])

    await user.merge(data)
    await user.save()
    return user
  }
}

module.exports = UserController
