const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tzechong:${password}@cluster0.hblhfor.mongodb.net/testNoteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Mongoose makes things easy',
  date: new Date(),
  important: true,
})


note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
})


// const note1 = new Note({
//   content: 'HTML is easy',
//   important: true,
//   date: new Date()
// })

// const note2 = new Note({
//   content: 'javascript is hard',
//   important: false,
//   date: new Date()
// })


// note1.save()
//   .then(savedNote => {
//     console.log(savedNote)
//     mongoose.connection.close()

//   })

// note2.save()
//   .then(savedNote => {
//     console.log(savedNote)
//     mongoose.connection.close()

//   })

