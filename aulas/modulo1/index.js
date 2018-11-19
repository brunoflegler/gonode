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

const users = [
  { name: 'Bruno Flegler' },
  { name: 'Luana Effgen' },
  { name: 'Cecilia Flegler' }
]

app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  const name = req.body.user
  users.push({ name })
  return res.redirect('/')
})

app.listen(3000)
