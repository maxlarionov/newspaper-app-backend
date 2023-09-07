const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config()

const usersRouter = require('./routes/users')
const articlesRouter = require('./routes/articles')
const tagsRouter = require('./routes/tags')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/tags', tagsRouter)

module.exports = app
