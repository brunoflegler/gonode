const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    const { filename: avatar } = req.file
    const { ...data } = req.body

    await User.create({ ...data, avatar })
    return res.redirect('/')
  }
}

module.exports = new UserController()
