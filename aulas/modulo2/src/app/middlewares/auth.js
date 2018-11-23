module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user

    console.log('dashboard')
    return next()
  }

  console.log('redireciona para login')
  return res.redirect('/')
}
