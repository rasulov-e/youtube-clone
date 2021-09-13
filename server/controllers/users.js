const express = require("express");
const fs = require("fs");
const db = require("../utils/database");

class UserController {
	async createUser(req, res) {
		const { username, password, email } = req.body;
		const now = new Date();
		const newPerson = await db.query(
			`INSERT INTO users (username, password, email, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
			[username, password, email, now, now]
		);
		res.status(201).send(newPerson.rows[0]);
	}
	async serveThumbnail(req, res) {
		const { id } = req.params;

		// get video stats (about 61MB)
		const hero = await db.query(`SELECT hero FROM users WHERE id = $1`, [
			id,
		]);
		const imagePath = `../database/heros/${hero.rows[0].hero}`;

		const headers = {
			"Content-Type": "image/jpg",
		};

		// HTTP Status 206 for Partial Content
		res.writeHead(206, headers);

		// create video read stream for this particular chunk
		const img = fs.readFileSync(imagePath);
		res.end(img, "binary");

		// Stream the video chunk to the client
	}
	async serveProfilePicture(req, res) {
		const { id } = req.params;

		// get video stats (about 61MB)
		const avatar = await db.query(
			`SELECT avatar FROM users WHERE id = $1`,
			[id]
		);
		const imagePath = `../database/avatars/${avatar.rows[0].avatar}`;

		const headers = {
			"Content-Type": "image/png",
		};

		// HTTP Status 206 for Partial Content
		res.writeHead(206, headers);

		// create video read stream for this particular chunk
		const img = fs.readFileSync(imagePath);
		res.end(img, "binary");

		// Stream the video chunk to the client
	}
}

module.exports = new UserController();
