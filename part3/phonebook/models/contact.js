const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGODB_URI


mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{6,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

const Contact = mongoose.model('Contact', contactSchema)

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)

