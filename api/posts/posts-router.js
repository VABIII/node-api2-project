const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find()
        res.json(posts)

    }
    catch (err) {
        res.status(500).json({
            message: 'The posts information could not be retrieved',
            error: err.message,
        })
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const post = await Posts.findById(id)
        if(!post) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
            res.json(post)
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'The post information could not be retrieved',
            error: err.message,
        })
    }
})

router.post('/', async (req, res) => {
    const {title, contents} = req.body
    try {
        const newPost = Posts.insert(req.body)
        if(!title || !contents) {
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        } else {
            res.status(201).json(newPost)
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the post to the database',
            error: err.message,
        })
    }
})

router.put('/:id', async (req,res) => {
    const { id } = req.params
    const {title, contents} = req.body

    try {
        const updatedPost = await Posts.update(id, req.body)
        if(!updatedPost) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else if (!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents or the post"
            })
        } else {
            res.status(200).json(updatedPost)
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the post to the database',
            error: err.message,
        })
    }
})

router.delete('/:id', async (req, res) => {
    // const { id } = req.params
    // try {
    //     const deletedPost = await Posts.remove(id)
    //     res.json(deletedPost)
    //
    //
    // }
    // catch (err) {
    //     res.status(500).json({
    //         message: 'The post could not be removed'
    //     })
    // }
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The adopter has been nuked' })
            } else {
                res.status(404).json({ message: 'The adopter could not be found' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error removing the adopter',
            })
        })
})

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params

    try {
        const comments = await Posts.findCommentById(id)
        if(!comments){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.json(comments)
        }
    }
    catch (err) {
        res.status(500).json({
            message: "The comments information could not be retrieved" ,
            error: err.message,
        })
    }
})












module.exports = router






















