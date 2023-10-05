const { prisma } = require('../prisma/prisma-client')

const tagsByArticle = async (req, res, next) => {
	try {
		const { id } = req.params

		const tags = await prisma.tag.findMany({
			include: {
				articles: true
			},
			where: {
				articles: {
					some: {
						articleId: id
					}
				}
			}
		})

		req.tags = tags

		next()
	} catch (error) {
		res.status(401).json({ message: 'Not logged in' })
	}
}

module.exports = {
	tagsByArticle
}