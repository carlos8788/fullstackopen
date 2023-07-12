const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('dist'))


app.use(express.json())

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovalace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
]

app.get('/info', (req, res) => {
    res.send(`
    <h1>Phonebook has info ${persons.length} people</h1>
    <h2>${Date()}</h2>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.filter(person => person.id === id)

    if (person.length === 0) return response.status(404).end()
    response.json(person)
})

const generateId = () => {
    let valueId = true
    let aleatorio = undefined

    while (valueId) {
        aleatorio = Math.floor(Math.random() * 10000) + 1;

        valueId = persons.some(person => person.id === aleatorio)

    }
    return aleatorio
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: generateId()
    }

    const verify = Object.values(person).every(valor => valor !== undefined)
    if (!verify) return response.status(400).send({ error: 'Missing number or name' })

    const existName = persons.some(p => p.name === person.name)
    if (existName) return response.status(400).send({ error: 'Name already exists' })

    persons = persons.concat(person)
    response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    
})