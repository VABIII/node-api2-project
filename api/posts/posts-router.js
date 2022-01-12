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

router.post('/',async (req, res) => {
    const { title, contents } = req.body

    try {
        if(!title || !contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            const newPost = await Posts.insert(req.body)
            const returnedPost = await Posts.findById(newPost.id)
            res.status(201).json(returnedPost)
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
        let dbPost = await Posts.findById(id)
        if( id === undefined || !dbPost) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else if (title === undefined || contents === undefined) {
            res.status(400).json({
                message:"Please provide title and contents for the post"
            })
        } else {
            await Posts.update(id, req.body)
            let dbPost = await Posts.findById(id)
            res.json(dbPost)
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
    const { id } = req.params
    const dbPost = await Posts.findById(id)

    try {
        if (!dbPost) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } else {
          res.json(dbPost)
          await Posts.remove(id)
        }
    }
    catch (err) {
        res.status(500).json({
            message:"The post could not be removed"
        })
    }


    // Posts.remove(req.params.id)
    //     .then(count => {
    //         if (count > 0) {
    //             res.status(200).json({ message: 'The adopter has been nuked' })
    //         } else {
    //             res.status(404).json({ message: 'The adopter could not be found' })
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         res.status(500).json({
    //             message: 'Error removing the adopter',
    //         })
    //     })
})

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params
    const post = await Posts.findById(id)
    const comments = await Posts.findPostComments(id)

    try {

        if(!post){
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






















