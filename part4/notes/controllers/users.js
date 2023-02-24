/* eslint-disable indent */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// use post to create a new user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)


    // A note about the cost: when you are hashing your data,
    // the module will go through a series of rounds to give
    // you a secure hash. The value you submit is not just
    // the number of rounds the module will go through to
    // hash your data. The module will use the value you
    // enter and go through 2^rounds hashing iterations.
    // https://github.com/kelektiv/node.bcrypt.js/#a-note-on-rounds

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { content: 1, important: 1 })
    response.json(users)
})

module.exports = usersRouter