const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const middleware = (req, res, next) => {
  const { age } = req.query
  if (!age) return res.redirect('/')
  return next()
}

app.get('/', (req, res) => {
  return res.render('main')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age > 18) return res.redirect(`/major?age=${age}`)
  else return res.redirect(`/minor?age=${age}`)
})

app.get('/major', middleware, (req, res) => {
  const { age } = req.query.age
  return res.render('major', { age })
})

app.get('/minor', middleware, (req, res) => {
  const { age } = req.query.age
  return res.render('minor', { age })
})

app.listen(3000)
