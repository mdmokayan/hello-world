var express = require('express')
var app = express()
const db = require('./db')

var bodyParser = require('body-parser')
app.use(bodyParser.json()) //req body

//middleware function
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`
  )
  next()
}

app.get('/', logRequest, (req, res) => {
  res.send('Welcome to my AL Barkhas')
})

// Import the router files and use the router
const personRoute = require('./routes/personRouter')
app.use('/person', personRoute) // use the router

const menuRoute = require('./routes/menuRouter')
app.use('/menu', menuRoute) // use the router

const PORT = process.env.PORT || 3000

app.listen(PORT)
