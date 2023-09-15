const { prisma } = require('../prisma/prisma-client')

/**
 * 
 * @route GET /api/tags
 * @desc Отримання усіх тегів
 * @access Public 
 */
const getAllTags = async (req, res) => {
	try {
		const tags = await prisma.tag.findMany()

		res.status(200).json(tags)
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло отримати список тегів' })
	}
}

/**
 * 
 * @route GET /api/tags/:id
 * @desc Отримання одного тега
 * @access Public 
 */
const getTag = async (req, res) => {
	try {
		const { id } = req.params

		const articles = await prisma.article.findMany({
			include: {
				tags: true
			},
			where: {
				tags: {
					some: {
						tagId: id
					}
				}
			}
		})

		res.status(200).json(articles)
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло отримати тег' })
	}
}

/**
 * 
 * @route POST /api/tags/add
 * @desc Додавання тега
 * @access Private 
 */
const addTag = async (req, res) => {
	try {
		const data = req.body

		if (!data.name) {
			return res.status(400).json({ message: 'Будь ласка, назвіть тег' })
		}

		const tag = await prisma.tag.create({
			data: {
				...data
			}
		})

		res.status(201).json(tag)
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло додати тег' })
	}
}

/**
 * 
 * @route POST /api/tags/remove/:id
 * @desc Видалення тега
 * @access Private
 */
const removeTag = async (req, res) => {
	try {
		const { id } = req.body

		await prisma.teg.delete({
			where: {
				id
			}
		})

		res.status(200).json({ message: 'Тег видален' })
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло видалити тег' })
	}
}

/**
 * 
 * @route PUT /api/tags/edit/:id
 * @desc Редагування тега
 * @access Private
 */
const editTag = async (req, res) => {
	try {
		const data = req.body
		const id = data.id

		if (!data.name) {
			return res.status(400).json({ message: 'Будь ласка, назвіть тег' })
		}

		await prisma.tag.update({
			where: {
				id,
			},
			data
		})

		res.status(200).json({ message: 'Тег відредаговано' })
	} catch (err) {
		res.status(500).json({ message: 'Не вийшло відредагувати тег' })
	}
}


module.exports = {
	getAllTags,
	getTag,
	addTag,
	removeTag,
	editTag
}