const mongoose = require('mongoose')
// const env = require('dotenv')
// env.config()

// const mongoURL = 'mongodb://localhost:27017/hotel' //mongodb connect URL
const mongoURL =
  'mongodb+srv://mdmokayan:Mokayan8328@cluster0.iqv8b4m.mongodb.net/'
// const mongoURL = process.env.MONGO_URL

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
