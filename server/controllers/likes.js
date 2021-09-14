const db = require("../utils/database");

class LikeController {
	async Like(req, res) {
		try {
			const { videoId } = req.body;

			const userId = req.body.user.id;

			const check = await db.query(
				`SELECT * FROM likes WHERE user_id = $1 AND video_id = $2;`,
				[userId, videoId]
			);

			if (check.rows[0]) {
				res.status(400).send("this video is already liked by you");
				return;
			}

			const response = await db.query(
				`INSERT INTO likes (user_id, video_id) VALUES($1, $2);`,
				[userId, videoId]
			);

			if (response.rowsAffected == 0) {
				res.status(400).send("did not add like");
				return;
			}

			const r = await db.query(
				`UPDATE videos SET likes = likes + 1 WHERE id = $1;`,
				[videoId]
			);

			res.status(200).send("liked the video");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async DeleteLike(req, res) {
		try {
			const { videoId } = req.body;

			const userId = req.body.user.id;

			const response = await db.query(
				`DELETE FROM likes WHERE user_id = $1 AND video_id = $2;`,
				[userId, videoId]
			);
			if (response.rowsAffected == 0) {
				res.status(400).send("did not remove like");
				return;
			}
			res.status(200).send("removed like from the video");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async LikesUnderVideo(req, res) {
		try {
			const { videoId } = req.params;

			const response = await db.query(
				`SELECT COUNT(*) FROM likes WHERE video_id = $1;`,
				[videoId]
			);

			if (response.rowsAffected == 0) {
				res.status(400).send("did not find likes");
				return;
			}

			res.status(200).send(response.rows[0]);
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
}

module.exports = new LikeController();
