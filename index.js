const express = require('express')
const app = express()
app.use(express.json())


let persons = [
    {
        "name": "Arto Hellas",
        "number": "123",
        "id": 1
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 2
    },
    {
        "name": "Nikko Ce",
        "number": "123-12-1",
        "id": 3
    },
    {
        "name": "Nldskjl Ce",
        "number": "1232-21-1",
        "id": 4
    }
]

const generateId = () =>{
    const maxID = persons.length > 0
    ? Math.max( ...persons.map(n => n.id))
    : 0
    return maxID +1
}


app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
  
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

    if(persons.some(person => person.name === body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })

    }
  
    let person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })


app.get('/api/persons', (req, res) => {
    res.json(persons)
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})