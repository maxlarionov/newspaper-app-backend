const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer')

require('dotenv').config()

const usersRouter = require('./routes/users')
const articlesRouter = require('./routes/articles')
const tagsRouter = require('./routes/tags')

const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage })

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/tags', tagsRouter)
app.use('/api/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/api/uploads/${req.file.originalname}`
	})
})
app.use('/api/uploads', express.static('uploads'))

module.exports = app
