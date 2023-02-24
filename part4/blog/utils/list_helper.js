// Load the full build.
var _ = require('lodash');
const blog = require('../models/blog');
// Load the core build.


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blog) => {
    const arrMap = blog.map(obj => obj.likes)
    const sumLikes = arrMap.reduce((acc, currentVal) => acc + currentVal)
    return sumLikes
}

const favoriteBlog = (blog) => {
    const maxLikes = blog.map(obj => obj.likes).reduce((a,b) => Math.max(a,b), -1)
    console.log(maxLikes)
    const favBlog = blog.find(obj => obj.likes === maxLikes)
    console.log(favBlog)
    return {
        author: favBlog.author,
        title: favBlog.title,
        likes: favBlog.likes
    }
}

const mostBlogs = (blog) => {
    const nameArray = blog.map(obj => obj.author)
    console.log(nameArray)
    const allCountObj = _.countBy(nameArray)
    console.log(allCountObj)
    const max = Object.keys(allCountObj).reduce((a, v) => Math.max(a, allCountObj[v]), 0)
    const result = Object.keys(allCountObj).filter(v => allCountObj[v] === max)
    console.log(result)
    return {
        "author": result.toString(),
        "blogs": allCountObj[result]
    }
}

const mostLikes = (blog) => {
    const nameAndLikes = blog.map(obj => {
        return {
            "author": obj.author,
            "likes": obj.likes
        }
    })
    console.log(nameAndLikes)

    let maxLikes = 0
    let authorWithMostLikes = ''

    // consolidate likes by author name, starting with empty obj
    const likesByAuthor = nameAndLikes.reduce((acc, cur) => {
        if (acc[cur.author]) {
            acc[cur.author] += cur.likes
        } else {
            acc[cur.author] = cur.likes
        }
        return acc
    }, {})

    console.log('likes by author', likesByAuthor)

    // finding author with the most likes
    for (let author in likesByAuthor) {
        if (likesByAuthor[author] > maxLikes) {
            maxLikes = likesByAuthor[author]
            authorWithMostLikes = author
        }
    }

    const result = {
        author: authorWithMostLikes,
        likes: maxLikes
    }

    console.log(result)

    return result
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}