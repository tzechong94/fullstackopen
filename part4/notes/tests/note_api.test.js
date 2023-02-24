/* eslint-disable indent */
/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

//   const noteObjects = helper.initialNotes.map(note => new Note(note))
//   const promiseArray = noteObjects.map(note => note.save())
//   await Promise.all(promiseArray)
  await Note.insertMany(helper.initialNotes)

})

// can also do this if you want the notes to be executed in a particular order
// beforeEach(async () => {
//     await Note.deleteMany({})

//     for (let note of helper.initialNotes) {
//       let noteObject = new Note(note)
//       await noteObject.save()
//     }
//   })


// eslint-disable-next-line no-undef
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(2)
})


test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})

test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
})


test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
        'Browser can execute only JavaScript'
    )
})


test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

test.only('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)


    // const notesAtEnd = await helper.notesInDb()
    // expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
})

test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(
        helper.initialNotes.length - 1
    )

    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
})

// eslint-disable-next-line no-undef
afterAll(async () => {
  await mongoose.connection.close()
})

