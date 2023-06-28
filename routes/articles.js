const express = require('express')
const router = express.Router()
const { getAllArticles, getArticle, addArticle, removeArticle, editArticle } = require('../controllers/articles')
const { auth } = require('../middleware/auth')

/* /api/articles/ */
router.get('/', getAllArticles)
/* /api/articles/:id */
router.get('/:id', getArticle)
/* /api/articles/add */
router.post('/add', auth, addArticle)
/* /api/articles/remove:id */
router.post('/remove/:id', auth, removeArticle)
/* /api/articles/edit/:id */
router.put('/edit/:id', auth, editArticle)

//! Access

module.exports = router
