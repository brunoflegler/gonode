const { User } = require('../models')

class SessionController {
  create (req, res) {
    res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha incorreta')
      return res.redirect('/')
    }

    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  async destroy (req, res) {
    console.log('passei no detroy')
    await req.session.destroy()
    res.clearCookie('root')
    return res.redirect('/')
  }
}

module.exports = new SessionController()