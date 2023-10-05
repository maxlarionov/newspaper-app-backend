const { prisma } = require('../prisma/prisma-client')
const bсrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * 
 * @route POST /api/user/login
 * @desc Логін
 * @access Public 
 */
const login = async (req, res, next) => {
	try {
		const { email, password, name } = req.body

		if (!email || !password) {
			return res.status(400).json({ message: 'Please fill in all fields' })
		}

		const user = await prisma.user.findFirst({
			where: {
				email,
			}
		})

		const isPasswordCorrect = user && (await bсrypt.compare(password, user.password))
		const secret = process.env.JWT_SECRET

		if (user && isPasswordCorrect && secret) {
			res.status(200).json({
				id: user.id,
				email: user.email,
				name: user.name,
				accessEditing: false,
				token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
			})
		} else {
			return res.status(400).json({ message: 'Incorrect login or password' })
		}
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' })
	}
}

/**
 * 
 * @route POST /api/user/register 
 * @desc Реєстрація
 * @access Public
 */
const register = async (req, res, next) => {
	try {
		const { email, password, name } = req.body

		if (!email || !password || !name) {
			return res.status(400).json({ message: 'Please fill in all fields' })
		}

		const registeredUser = await prisma.user.findFirst({
			where: {
				email
			}
		})

		if (registeredUser) {
			return res.status(400).json({ message: 'A user with this email already exists' })
		}

		const salt = await bсrypt.genSalt(10)
		const hashedPassword = await bсrypt.hash(password, salt)

		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword
			}
		})

		const secret = process.env.JWT_SECRET

		if (user && secret) {
			res.status(201).json({
				id: user.id,
				email: user.email,
				name: user.name,
				token: jwt.sign({ id: user.id }, secret, { expiresIn: '10d' })
			})
		} else {
			return res.status(400).json({ message: 'User creation failed' })
		}

	} catch (err) {
		res.status(500).json({ message: 'Something went wrong' })
	}
}

/**
 * 
 * @route GET /api/user/current 
 * @desc Поточний користувач
 * @access Private
 */
const current = async (req, res, next) => {
	return res.status(200).json(req.user)
}

module.exports = {
	login,
	register,
	current
}

