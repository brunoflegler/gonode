'use strict'

const Hash = use('Hash')

class ChangePasswordController {
  async update ({ request, response, auth: { user } }) {
    const data = request.only(['password_old', 'password'])

    const isSame = await Hash.verify(data.password_old, user.password)

    if (!isSame) {
      return response
        .status(401)
        .send({ error: { message: 'Password old is not match' } })
    }

    delete data.password_old

    await user.merge(data)
    await user.save()
  }
}

module.exports = ChangePasswordController
