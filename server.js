var express = require('express')
var app = express()
var bodyParser = require('body-parser')

const db = require('./db')

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

app.listen(8000)
