const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const contactName = process.argv[3]
const number = process.argv[4]


const url =

mongoose.set('strictQuery', false)
mongoose.connect(url)

// console.log(password + " password")
// console.log(contactName + " contactName")

const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length>3) {

  const contact = new Contact({
    name: contactName,
    number: number
  })
    
  contact.save().then(result => {
    console.log('contact saved')
    console.log('added ' + contact.name + ', number ' + contact.number)
    mongoose.connection.close()
  })

} else {
  console.log('phonebook:')
  Contact.find({}).then(result=> {
    result.forEach(contact => {
      console.log(contact.name + " " + contact.number)
    })
    mongoose.connection.close()

  })
}

