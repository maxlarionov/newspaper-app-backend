const { prisma } = require('../prisma/prisma-client')

/**
 * 
 * @route GET /api/articles
 * @desc Get articles
 * @access Public 
 */
const getAllArticles = async (req, res) => {
	try {
		const articles = await prisma.article.findMany()

		res.status(200).json(articles)
	} catch (err) {
		res.status(500).json({ message: 'Failed to get list of articles' })
	}
}

/**
 * 
 * @route GET /api/articles/:id
 * @desc Get article
 * @access Public 
 */
const getArticle = async (req, res) => {
	try {
		const { id } = req.params
		const tags = req.tags
		const article = await prisma.article.findUnique({
			where: {
				id
			},
		})

		const articleAndTags = { article, tags }

		res.status(200).json(articleAndTags)
	} catch (err) {
		res.status(500).json({ message: 'Failed to get article' })
	}
}

/**
 * 
 * @route POST /api/articles/add
 * @desc Add article
 * @access Private 
 */
const addArticle = async (req, res) => {
	try {
		const data = req.body

		if (!data.title || !data.text || !data.picture || !data.time) {
			return res.status(400).json({ message: 'Please fill in all fields' })
		}

		const article = await prisma.article.create({
			data: {
				...data,
				userId: req.user.id,
			}
		})

		res.status(201).json(article)
	} catch (err) {
		res.status(500).json({ message: 'Failed to add article' })
	}
}

/**
 * 
 * @route POST /api/articles/remove/:id
 * @desc Remove article
 * @access Private 
 */
const removeArticle = async (req, res) => {
	try {
		const { id } = req.body

		await prisma.article.delete({
			where: {
				id
			}
		})

		res.status(200).json({ message: 'Article removed' })
	} catch (err) {
		res.status(500).json({ message: 'Failed to remove article' })
	}
}

/**
 * 
 * @route PUT /api/articles/edit/:id
 * @desc Edit article
 * @access Private 
 */
const editArticle = async (req, res) => {
	try {
		const data = req.body
		const id = data.id

		if (!data.title || !data.text || !data.picture || !data.time) {
			return res.status(400).json({ message: 'Please fill in all fields' })
		}

		await prisma.article.update({
			where: {
				id,
			},
			data
		})

		res.status(200).json({ message: 'Article edited' })
	} catch (err) {
		res.status(500).json({ message: 'Failed to edit article' })
	}
}


module.exports = {
	getAllArticles,
	getArticle,
	addArticle,
	removeArticle,
	editArticle
}