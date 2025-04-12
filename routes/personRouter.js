const express = require('express')
const personrouter = express.Router()
const person = require('./../models/person')

//POST route to add person
personrouter.post('/', async (req, res) => {
  try {
    const data = req.body //Assuming the request body contains the person data

    //create a new person document using the mongoose model
    const newPerson = new person(data)

    //save the new person to the database
    const responce = await newPerson.save()

    console.log('data saved')
    res.status(200).json(responce)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

//GET route to add person
personrouter.get('/', async (req, res) => {
  try {
    const data = await person.find()
    console.log('data fetched')
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

personrouter.get('/:worktype', async (req, res) => {
  try {
    const workdata = req.params.worktype //extract the work type from thr URL parameter

    if (workdata == 'chef' || workdata == 'manager' || workdata == 'waiter') {
      const responce = await person.find({ work: workdata })

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

//PUT route to add person
personrouter.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id //extract the id from the URL parameter
    const updatePersonId = req.body //update data for the person

    const responce = await person.findByIdAndUpdate(personId, updatePersonId, {
      new: true, //Return the update document
      runValidators: true, //Run Mongoose validation
    })

    if (!responce) {
      return res.status(404).json({ error: 'person not found' })
    }

    console.log('data updated')
    res.status(200).json(responce)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

//DELETE route to add person
personrouter.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id //extract the id from the URL parameter

    //Assuming you have a person model
    const responce = await person.findByIdAndDelete(personId)

    if (!responce) {
      return res.status(404).json({ error: 'person not found' })
    }

    console.log('data delete')
    res.status(200).json({ massage: 'data delete successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = personrouter
