# fullstack_part3
As recommended by this part, I am using a new repo for part3

# 3.1: Phonebook backend step1
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