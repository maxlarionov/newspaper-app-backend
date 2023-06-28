const { prisma } = require('../prisma/prisma-client')

const getAllArticles = async (req, res) => {
	try {
		const articles = await prisma.article.findMany()

		res.status(200).json(articles)
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло отримати список статті' })
	}
}

const getArticle = async (req, res) => {
	try {
		const { id } = req.params
		const article = await prisma.article.findUnique({
			where: {
				id
			}
		})

		res.status(200).json(article)
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло отримати статтю' })
	}
}

const addArticle = async (req, res) => {
	try {
		const data = req.body

		if (!data.title || !data.text || !data.picture || !data.time) {
			return res.status(400).json({ message: 'Будь ласка, заповніть усі поля' })
		}

		const article = await prisma.article.create({
			data: {
				...data,
				userId: req.user.id
			}
		})

		res.status(201).json(article)
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло додати статтю' })
	}
}

const removeArticle = async (req, res) => {
	try {
		const { id } = req.body

		await prisma.article.delete({
			where: {
				id
			}
		})

		res.status(200).json({ message: 'Стаття видалена' })
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло видалити статтю' })
	}
}

const editArticle = async (req, res) => {
	try {
		const data = req.body
		const id = data.id

		if (!data.title || !data.text || !data.picture || !data.time) {
			return res.status(400).json({ message: 'Будь ласка, заповніть усі поля' })
		}

		await prisma.article.update({
			where: {
				id,
			},
			data
		})

		res.status(200).json({ message: 'Статтю відредаговано' })
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло відредагувати статтю' })
	}
}


module.exports = {
	getAllArticles,
	getArticle,
	addArticle,
	removeArticle,
	editArticle
}