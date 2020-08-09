
# 3.18*: Phonebook database step6
Also update the handling of the api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.


```js
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(req.params.id).then(person =>{
        res.json(person)
    })
    .catch(error => res.status(404).end())
})
```

# 3.17*: Phonebook database, step5
If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Modify the backend to support this request.

Verify that the frontend works after making your changes.

```js
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
      number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true})
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })
```

# 3.16: Phonebook database, step4
Move the error handling of the application to a new error handler middleware.

```js

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)
  ```

# 3.15: Phonebook database, step3
Change the backend so that deleting phonebook entries is reflected in the database.

Verify that the frontend still works after making the changes.

```js
const deletePerson = (personToBeDeleted) => {

    console.log('delete: ',personToBeDeleted._id )
    if(window.confirm(`Delete ${personToBeDeleted._id}`)){
      personeService
      .deleteObjectById(personToBeDeleted._id)
      .then(
        setPersons(persons.filter((person) => person['_id'] !== personToBeDeleted['_id']))
      )
      .then(
        setFilterText('')
      )
    }
  }
```

# 3.14: Phonebook database, step2
Change the backend so that new numbers are saved to the database. Verify that your frontend still works after the changes.

At this point, you can choose to simply allow users to create all phonebook entries. At this stage, the phonebook can have multiple entries for a person with the same name.
```js


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
```
# 3.13: Phonebook database, step1
Change the fetching of all phonebook entries so that the data is fetched from the database.

Verify that the frontend works after the changes have been made.

```js
const Person = require('./models/person')

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})
```

```js
//person.js
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log('connecting to', url)

// url  mongodb+srv://fullstack:<password>@cluster0.eusd4.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})


module.exports = mongoose.model('Person', personSchema)

```
# 3.12: Command-line database
Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

```
node mongo.js yourpassword Anna 040-1234556
```

```js
const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const url =
  `mongodb+srv://fullstack:${password}@cluster0.eusd4.mongodb.net/persons-app?retryWrites=true&w=majority`

//   mongodb+srv://fullstack:<password>@cluster0.eusd4.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3 ){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    }).
    mongoose.connection.close()
  })
}

if (process.argv.length > 3 ){
  const person = new Person({
    name: name,
    number: number
  })
  
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
```

# 3.11 phonebook full stack

- Also make sure that the frontend still works locally.
In the Phonebook's ./service/persona files: 
```js
const baseUrl = 'http://localhost:3001/api/persons'
```

When deploying to Heroku, I need to use a relative path 

```js
const baseUrl = '/api/persons'
```

Or Just use  a proxy in your package.json file, under your react project 
```js
{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}
```




# 3.10 phonebook backend step10
Deploy the backend to the internet, for example to Heroku.
URL: [https://stormy-plateau-08730.herokuapp.com/](https://stormy-plateau-08730.herokuapp.com/)

# 3.9 phonebook backend step9

```js
const baseUrl = 'http://localhost:3001/api/persons'
const cors = require('cors')
app.use(cors())

```

# 3.8*: Phonebook backend step8
Configure morgan so that it also shows the data sent in HTTP POST requests:

```js
const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())

// create custome message in the middleweare s
morgan.token('ob', function (req, res) { 
    console.log("ob", req.body)
    return `${JSON.stringify(req.body)}` })

app.use(morgan(':method :url :status :response-time :req[header] :ob'))
```

# fullstack_part3
As recommended by this part, I am using a new repo for part3

3.7: Phonebook backend step7
Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

The documentation for Morgan is not the best, and you may have to spend some time figuring out how to configure it correctly. However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.

Morgan is installed just like all other libraries with the npm install command. Taking morgan into use happens the same way as configuring any other middleware by using the app.use command.

```js
const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'));

```

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