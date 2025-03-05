const express = require('express')
const menurouter = express.Router()
const menu = require('./../models/menu')
const menuItem = require('./../models/menu')

menurouter.post('/', async (req, res) => {
  try {
    const datamenu = req.body //Assuming the request body contains the person data

    //create a new person document using the mongoose model
    const newMenu = new menu(datamenu)

    //save the new person to the database
    const result = await newMenu.save()
    console.log('data saved')
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

menurouter.get('/', async (req, res) => {
  try {
    const datamenu = await menu.find()
    console.log('data fetched')
    res.status(200).json(datamenu)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

menurouter.get('/:tastetype', async (req, res) => {
  try {
    const tastedata = req.params.tastetype
    console.log(tastedata)
    if (tastedata === 'sweet' || tastedata === 'spicy') {
      const responce = await menuItem.find({ taste: tastedata })
      console.log('data fetched')
      res.status(200).json(responce)
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = menurouter
