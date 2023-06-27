const login = async (req, res, next) => {
	try {
		res.send('login')
	} catch (err) {
		res.send(err)
	}
}

const register = async (req, res, next) => {
	try {
		res.send('register')
	} catch (err) {
		res.send(err)
	}
}

const current = async (req, res, next) => {
	try {
		res.send('current')
	} catch (err) {
		res.send(err)
	}
}

module.exports = {
	login,
	register,
	current
}

