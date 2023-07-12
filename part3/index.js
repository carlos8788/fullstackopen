require ('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const connectMongo = require('./mongo.js')

const PASSWORD = process.env.PASSWORD

const Person = connectMongo(PASSWORD)
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('dist'))
app.use(cors())

app.use(express.json())
// app.use(requestLogger)




app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find()
  res.json(persons)
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', async (request, response) => {
  const body = request.body
  
  const person = {
    name: body.name,
    number: body.phone
  }
  
  try {
    const result = await Person.create(person)
    response.json(result)
  }
  catch (error) {
    console.log(error)
  }
})

app.get('/api/persons/:name', async (request, response) => {
  const person = await Person.findOne({name: request.params.name})
  response.json(person)
})

app.delete('/api/persons/:name', async (request, response) => {
  const personDelete = await Person.deleteOne({name: request.params.name})
  response.json(personDelete)
})

app.use(unknownEndpoint)

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})