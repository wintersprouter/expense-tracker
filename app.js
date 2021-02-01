const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})