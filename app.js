const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

require('dotenv').config()

const usersRouter = require('./routes/users')
const articlesRouter = require('./routes/articles')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/articles', articlesRouter)

module.exports = app
