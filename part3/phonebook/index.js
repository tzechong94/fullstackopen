require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

const Contact = require('./models/contact')

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


const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send( { error: error.message } )
  }

  next(error)
}

app.get('/api/persons', (request,response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.put('/api/persons/:id', (request,response,next) =>  {

  const body = checkGetPostBody(request, response)
  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request,response, next) => {
  Contact.findById(request.params.id).then(contact => {
    if (contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => {
      next(error)
    })
})

const checkGetPostBody = (req, res) => {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({ error: 'the name field is missing' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'the number field is missing' })
  }
  return body
}


app.post('/api/persons', (request, response, next) => {
  const body = checkGetPostBody(request, response)

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
    .catch(
      error => next(error)
    )
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  const date = new Date()
  Contact.countDocuments()
    .then(numberOfPeople => {
      const message = `<div>
            <p>Phonebook has info for ${numberOfPeople} people.</p>
            <p>${date}</p>
        </div>`
      response.send(message).end()
    })
    .catch(error => next(error))
})

// Contact.find({}).then(contacts => {
//     response.json(contacts)

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


//https://github.com/zubko/fullstack-open-part3-phonebook/blob/master/backend/index.js