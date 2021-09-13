const db = require("../utils/database");

class CommentController {
	async GetComments(req, res) {
		try {
			const response = await db.query(`SELECT * FROM comments;`);

			res.status(200).send(response.rows);
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async CreateComment(req, res) {
		console.log("creating comment");
		try {
			const { body, authorId, videoId } = req.body;

			const now = new Date();

			const response = await db.query(
				`INSERT INTO comments(
				author_id, body, video_id, created_at)
				VALUES ($1, $2, $3, $4);`,
				[authorId, body, videoId, now]
			);

			res.status(200).send("comment was created");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async FindCommentsForVideo(req, res) {
		console.log("finding comments");
		try {
			const { id } = req.params;

			const response = await db.query(
				`SELECT * FROM comments WHERE video_id = $1`,
				[id]
			);

			if (response.rows) {
				res.status(200).send(response.rows);
				return;
			}
			res.status(400).send("did not find any comments");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
}

module.exports = new CommentController();
