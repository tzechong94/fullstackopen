const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

// app.use(morgan((tokens, req, res) => {
//     return [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'), '-',
//         tokens['response-time'](req, res), 'ms', JSON.stringify(req.body)].join(' ')
// })
// )

morgan.token('body', function getBody(req){
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time :body'))

  
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



const generateId = () => {
    return Math.floor(Math.random() * (100-4) + 4)
}

app.get('/api/persons', (request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id', (request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response)=> {
    const body = request.body
    
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.map(person=> person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'duplicate name'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id!== id)
    response.status(204).end()
})


app.get('/info', (request, response)=>{
    const numberOfPeople = persons.length
    const date = new Date()

    response.send(
        `<div>
            <p>Phonebook has info for ${numberOfPeople} people.</p>
            <p>${date}</p>
        </div>`
    )
})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})