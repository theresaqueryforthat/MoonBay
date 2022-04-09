const argon2 = require('argon2');
const {
	User
} = require('../models');
module.exports = {
	createUser: async (req, res) => {
		const { username, email, password, master } = req.body;
		if (!username || !email || !password || !master) {
			return res.status(400).json({
				error: 'You must provide a username, email, password, and master password'
			});
		}
		try {
			const user = await User.create({
				username,
				email,
				password: await argon2.hash(password, {
					type: argon2.argon2id,
				}),
				master: await argon2.hash(master, {
					type: argon2.argon2id,
				}),
			});
			res.json(user);
		} catch (e) {
			res.json(e);
		}
	},
	// (TESTING) getting users
	// getAllUsers: async (req, res) => {
	// 	try {
	// 		const usersData = await User.findAll({});

	// 		const users = usersData.map(user => user.get({
	// 			plain: true
	// 		}));

	// 		console.log(users);
	// 		res.json(users);
	// 	} catch (e) {
	// 		res.json(e);
	// 	}
	// },
	renderHomePage: async (req, res) => {
		if (req.session.loggedIn) {
			console.log('rendering logged in homepage...')
			return res.render('loggedInHomepage', {layout: 'loggedIn'});
		}
		console.log('rendering default homepage...');
		res.render('homepage');
	},
	getUserById: async (req, res) => {
		req.session.save(() => {
			if (req.session.visitCount) {
				req.session.visitCount++;
			} else {
				req.session.visitCount = 1;
			}
		});
		try {
			const userData = await User.findByPk(req.params.userId);
			const user = userData.get({
				plain: true
			});
			res.render('singleUser', {
				user,
				visitCount: req.session.visitCount,
			});
		} catch (e) {
			res.json(e);
		}
	},
	login: async (req, res) => {
		try {
			//	first find the user with the given email address
			const userData = await User.findOne({
				where: {
					email: req.body.email
				}
			});
			const userFound = userData.get({
				plain: true
			});
			//	check if the password from the form is the same password as the user found
			//	with the given email
			//	if that is true, save the user found in req.session.user
			if ((await argon2.verify(userFound.password, req.body.password))) {
				req.session.save(() => {
					req.session.loggedIn = true;
					req.session.user = userFound;
					res.json({
						success: true
					});
				});
			}
		} catch (e) {
			console.log(e);
			res.json(e);
		}
	},

	signupHandler: async (req, res) => {
		const {
			email,
			username,
			password,
			master,
		} = req.body;
		console.log('signup req:', req.body)
		try {
			const newUser = await User.create({
				username,
				email,
				password: await argon2.hash(password, {
					type: argon2.argon2id,
				}),
				master: await argon2.hash(password, {
					type: argon2.argon2id,
				}),
			});
			const user = newUser.get({
				plain: true
			});
			console.log('created user:', user);
			req.session.save(() => {
				req.session.loggedIn = true;
				req.session.user = user;
				res.redirect('/saved');
			});
		} catch (e) {
			res.json(e);
		}
	},

	signinView: (req, res) => {
		if (req.session.loggedIn) {
			console.log('rendering logged in saved page...')
			return res.render('saved', {
				layout: 'loggedIn'
			});
		}
		res.render('login');
	},
	signupView: (req, res) => {
		if (req.session.loggedIn) {
			return res.redirect('/saved');
		}
		res.render('signUp');
	},
	logout: (req, res) => {
		req.session.destroy(() => {
			res.send({
				status: true
			});
		})
	},
}
