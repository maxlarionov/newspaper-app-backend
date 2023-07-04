const express = require('express')
const router = express.Router()
const { getAllTags, getTag, addTag, removeTag, editTag } = require('../controllers/tags')
const { auth } = require('../middleware/auth')

/* /api/tags/ */
router.get('/', getAllTags)
/* /api/tags/:id */
router.get('/:id', getTag)
/* /api/tags/add */
router.post('/add', auth, addTag)
/* /api/tags/remove:id */
router.post('/remove/:id', auth, removeTag)
/* /api/tags/edit/:id */
router.put('/edit/:id', auth, editTag)

//! Access

module.exports = router
