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





















module.exports = router






















