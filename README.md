# fullstack_part3
As recommended by this part, I am using a new repo for part3

# 3.6: Phonebook backend step6
Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook

```js

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
```

# 3.5: Phonebook backend step5
Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate id's is small.
```js
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
        error: 'name is missing' 
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
  ```
# 3.4: Phonebook backend step4
Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.
```js
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id != id)
    res.status(204).end()
})

```

# 3.3: Phonebook backend step3
Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

```js

app.get('/api/persons/:id', (req, res) =>{
    const id = req.params.id
    const person =  persons.find(person => {return person.id == id})
    console.log(person)

    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})
```


# 3.2: Phonebook backend step2
Implement a page at the address http://localhost:3001/info that looks roughly like this:


```js
app.get('/api/info', (req, res) =>{
    const utcDate1 = new Date(Date.now());
    res.send(`<p> Phonebook has info for ${persons.length} people </p> <p> ${utcDate1.toUTCString()}</p>`)
})

```

# 3.1: Phonebook backend step1
Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons:


```js
const express = require('express')
const app = express()

const persons = [
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
  
app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

const PORT =3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
}) 
```