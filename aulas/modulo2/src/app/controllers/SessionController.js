const { User } = require('../models')

class SessionController {
  create (req, res) {
    res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuário não encontrado')

      // console.log('error', req.flash('error'))
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')

      // console.log('error', req.flash('error'))

      return res.redirect('/')
    }

    req.session.user = user

    if (user.provider) return res.redirect('/app/haircutter/dashboard')
    return res.redirect('/app/dashboard')
  }

  async destroy (req, res) {
    await req.session.destroy()
    res.clearCookie('root')
    return res.redirect('/')
  }
}

module.exports = new SessionController()
