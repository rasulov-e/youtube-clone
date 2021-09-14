const db = require("../utils/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const secret = "secret";

const generateAccessToken = (id) => {
	const payload = {
		id,
	};
	return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: "Ошибка при регистрации", errors });
			}
			const { username, password, email } = req.body;
			const candidate = await db.query(
				`SELECT username FROM users WHERE username = $1`,
				[username]
			);

			if (candidate.rows[0]) {
				return res.status(400).json({
					message: "Пользователь с таким именем уже существует",
				});
			}

			if (req.files) {
				const avatar = req.files.avatar;
				const hero = req.files.hero;

				avatar.mv("../database/avatars/" + avatar.name);
				hero.mv("../database/heros/" + hero.name);

				const hashedPassword = bcrypt.hashSync(password, 4);

				const now = new Date();

				const response = await db.query(
					`INSERT INTO public.users(
				 username, password, email, created_at, updated_at, avatar, hero)
				VALUES ($1, $2, $3, $4, $5, $6, $7);`,
					[
						username,
						hashedPassword,
						email,
						now,
						now,
						avatar.name,
						hero.name,
					]
				);

				if (response.rowsAffected == 0) {
					res.status(400).send("did not resgistr");
					return;
				}
				return res.json({
					message: "Пользователь был успешно зарегистрирован",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: "Registrations error" });
		}
	}
	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await db.query(
				`SELECT id, username, password FROM users WHERE username = $1`,
				[username]
			);

			if (!user.rows[0]) {
				return res
					.status(400)
					.json({ message: `Пользователь ${username} не найден` });
			}
			const validPassword = bcrypt.compareSync(
				password,
				user.rows[0].password
			);
			if (!validPassword) {
				return res
					.status(400)
					.json({ message: `Введен неверный пароль` });
			}
			const token = generateAccessToken(user.rows[0].id);
			return res.json({ token });
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: "Login error" });
		}
	}
	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.json(users);
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: "get users error" });
		}
	}
}

module.exports = new AuthController();
