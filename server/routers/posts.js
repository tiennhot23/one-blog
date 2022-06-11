const express = require('express')

const Post = require('../models/Post')
const PostController = require('../controllers/PostController')
const Constants = require('../configs/constants')

const router = express.Router()

/*
    like %a => /a$/ => `${query}$`
    like a% => /^a/ => `^${query}`
    like %a% = > /a/ => `${query}`
*/
router.get('/', async (req, res, next) => {
   const page = Number((!req.query.page) ? 1 : req.query.page)
   const index = (page - 1) * Constants.limit_element
   const query = `${req.query.query ? req.query.query : ''}`
   const tags = req.query.tags
   try {
      var posts = await PostController.get(query, tags, index, Constants.limit_element)
      res.status(200).json({
         code: 200,
         data: posts
      })
   } catch (err) {
      res.status(500).json({
         code: 500,
         message: err.message
      })
   }
})

router.get('/tags', async (req, res, next) => {
   try {
      var tags = await PostController.get_tags()
      res.status(200).json({
         code: 200,
         data: tags
      })
   } catch (err) {
      res.status(500).json({
         code: 500,
         message: err.message
      })
   }
})

router.get('/:slug', async (req, res, next) => {
   const slug = req.params.slug
   try {
      var post = await PostController.get_detail(slug)
      res.status(200).json({
         code: 200,
         data: [post]
      })
   } catch (err) {
      res.status(500).json({
         code: 500,
         message: err.message
      })
   }
})

router.post('/', async (req, res, next) => {
   const post = new Post({
      ...req.body
   })
   try {
      post = await PostController.insert(post)
      res.status(200).json({
         code: 200,
         data: [post]
      })
   } catch (err) {
      res.status(500).json({
         code: 500,
         message: err.message
      })
   }
})

router.delete('/:slug', async (req, res, next) => {
   try {
      const post = await PostController.delete(req.params.slug)
      res.status(200).json({
         code: 200,
         data: [post]
      })
   } catch (err) {
      res.status(500).json({
         code: 500,
         message: err.message
      })
   }
})

router.put('/:slug', async (req, res, next) => {
   try {
      const post = await PostController.update(req.params.slug, req.body)
      res.status(200).json({
         code: 200,
         data: [post]
      })
   } catch (err) {
      if (JSON.stringify(req.body) === JSON.stringify({}))
         res.status(400).json({
            code: 400,
            message: err.message
         })
      else
         res.status(500).json({
            code: 500,
            message: err.message
         })
   }
})

module.exports = router