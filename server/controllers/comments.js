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
		try {
			const { body, videoId } = req.body;

			const authorId = req.body.user.id;

			const now = new Date();

			const response = await db.query(
				`INSERT INTO comments(
				author_id, body, video_id, created_at)
				VALUES ($1, $2, $3, $4);`,
				[authorId, body, videoId, now]
			);

			if (response.rowsAffected == 0) {
				res.status(500).send("did not create comment");
				return;
			}

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
