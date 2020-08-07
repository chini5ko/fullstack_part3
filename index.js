require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))
//

// create custome message in the middleweare s
morgan.token('ob', function (req, res) {
    return `${JSON.stringify(req.body)}`
})

app.use(morgan(':method :url :status :response-time :req[header] :ob'))


// const generateId = () => {
//     const maxID = persons.length > 0
//         ? Math.max(...persons.map(n => n.id))
//         : 0
//     return maxID + 1
// }


app.post('/api/persons', (request, response) => {
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
            console.log("name must be unique")
            return response.status(400).json({
                error: 'name must be unique'
            })
        }

         let person = new Person(  {
            name: body.name,
            number: body.number
        })
             // id: generateId(),
    
        // save in mongod DV
        person.save().then(savedPerson => {
            console.log('savedPerson', savedPerson)
            response.json(savedPerson)
        })
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get('/api/info', (req, res) => {
    const utcDate1 = new Date(Date.now());
    res.send(`<p> Phonebook has info for ${persons.length} people </p> <p> ${utcDate1.toUTCString()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => { return person.id == id })

    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id != id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
}) 