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

// const Person = mongoose.model('Person', personSchema)


// if (process.argv.length == 3 ){
//     Person.find({}).then(result => {
//       result.forEach(person => {
//         console.log(person)
//       }).
//       mongoose.connection.close()
//     })
//   }
  
//   if (process.argv.length > 3 ){
//     const person = new Person({
//       name: name,
//       number: number
//     })
    
//     person.save().then(result => {
//       console.log(`added ${name} number ${number} to phonebook`)
//       mongoose.connection.close()
//     })
//   }


// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

