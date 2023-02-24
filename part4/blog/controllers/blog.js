const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})
  
blogRouter.post('/', async (request, response, next) => {
	const body = request.body
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    }

    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedNote)
})
  
module.exports = blogRouter