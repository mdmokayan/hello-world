const mongoose = require('mongoose')
require('dotenv').config()

// const mongoURL = 'mongodb://localhost:27017/hotel' //mongodb connect URL

// Difine the mongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL

//set up mongodb connection
mongoose.connect(mongoURL)

//get the default connection
//mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection

//define event listener for database connection
db.on('connected', () => {
  console.log('Connect to mongoDB server')
})

db.on('error', (err) => {
  console.log('MongoDB connection error', err)
})

db.on('disconnected', () => {
  console.log('Disconnect to mongoDB server')
})

module.exports = db
