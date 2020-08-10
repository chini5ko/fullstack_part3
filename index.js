require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))
//



// create custome message in the middleweare s
morgan.token('ob', function (req) {
  return `${JSON.stringify(req.body)}`
})

app.use(morgan(':method :url :status :response-time :req[header] :ob'))


// const generateId = () => {
//     const maxID = persons.length > 0
//         ? Math.max(...persons.map(n => n.id))
//         : 0
//     return maxID + 1
// }


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // console.log(body)

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  ///
  Person.find({}).then(persons => {
    console.log('persons: ', persons)

    if (persons.some(person => person.name === body.name)) {
      console.log('name must be unique')
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    let person = new Person({
      name: body.name,
      number: body.number
    })
    // id: generateId(),

    // save in mongod DV
    // var opts = { runValidators: true };

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
      .catch(error => next(error))
  })
})

app.get('/api/persons', (req, res) => {

  Person.find({}).then(persons => {
    console.log('get/api/persons', persons)
    res.json(persons.map(person => person.toJSON()))
  })

  // Person.find({}).then(result => {
  //     res.json(result)
  // })
})

app.get('/api/info', (req, res) => {
  const utcDate1 = new Date(Date.now())
  res.send(`<p> Phonebook has info for ${Person.length} people </p> <p> ${utcDate1.toUTCString()}</p>`)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    }
    else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  console.log(id, typeof (id))

  // persons = persons.filter(person => person.id != id)
  // res.status(204).end()
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // console.error(error.message)
  console.log('errorHandler called')

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
