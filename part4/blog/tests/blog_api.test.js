const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('DB Cleared')

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    console.log('saved')
})

// Use the supertest package for writing a test that makes an
//  HTTP GET request to the /api/blogs URL. Verify that the blog
//  list application returns the correct amount of blog posts 
//  in the JSON format.

//4.8
test('get returns correct number of posts', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body).toHaveLength(6)
})

//4.9
test('check if id property exists', async () => {
    const response = await api.get('/api/blogs')

    console.log(response.body.map(obj=> obj.id))
    expect(response.body.map(obj => obj.id)).toBeDefined()
})


//4.10
test('a blog can be added', async () => {
    const newBlog = {
        title: "Dog wars",
        author: "Robert D. Jr",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/DogWars.html",
        likes: 5,
        __v: 0
    }  

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    console.log(blogsAtEnd.length)
    const newTitle = blogsAtEnd.map(b => b.title)
    console.log(newTitle)
    expect(newTitle).toContain('Dog wars')
})

//4.11
test('likes default to 0', async () => {
    const newBlog = {
        title: "Cat wars",
        author: "Robert Pen Eraser",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/CatWars.html",
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsList = await helper.blogsInDb()
    const blogsLikes = blogsList.map(blog => blog.likes)
    console.log(blogsLikes, 'all blog likes')
    console.log(blogsLikes[blogsLikes.length -1], 'new like')
    expect(blogsLikes[blogsLikes.length -1]).toEqual(0)
//    expect(blogsLikes.pop()).toEqual(0) works too
// slice(-1) works too, but have to convert into integer from array
})

//4.12
test('title or url cannot be missing', async () => {
    const newBlogWithoutTitle = {
        author: "Robert Pen Eraser",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/CatWars.html",
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)

    console.log('without title tested')

    const newBlogWithoutUrl = { 
        title: "Cat wars",
        author: "Robert Pen Eraser",
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlogWithoutUrl)
        .expect(400)

    console.log('without url tested')


})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()


    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
    
})

test.only('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = blogsAtStart[0]

    console.log(blogToUpdate, 'blogtoupdate')
    
    const newBlog = {
        title: "Dog wars",
        author: "Robert D. Jr",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/DogWars.html",
        likes: 5,
    }  

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].title).toContain(newBlog.title)

})

afterAll(async () => {
    await mongoose.connection.close()
})
  