const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
	try {
		const user = await User.create({
			name_title: req.body.name_title,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			gender: req.body.gender,
			user_status: req.body.user_status,
			created_at: req.body.created_at
		});

		res.send({
			message: "User was registered successfully"
		});
	} catch (err) {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the User."
		});
	}
};

exports.signin = async (req, res) => {
	await User.findOne({
		where: {
			email: req.body.email,
		}
	})
		.then(user => {
			if (!user) {
				return res.status(404).send({ message: "Email Not found." });
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!"
				});
			}

			var token = jwt.sign({email: user.email, user_id: user.user_id, role: user.role}, config.secret, {
				expiresIn: 86400 // 24 hours
			});

			console.log(user);

			res.status(200).send({
				token: token,
				email: user.email,
				user_id: user.user_id,
				role: user.role
			});
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
};