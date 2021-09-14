const db = require("../utils/database");

class DislikeController {
	async Dislike(req, res) {
		try {
			const { videoId } = req.body;

			const userId = req.body.user.id;

			const check = await db.query(
				`SELECT * FROM dislikes WHERE user_id = $1 AND video_id = $2;`,
				[userId, videoId]
			);

			if (check.rows[0]) {
				res.status(400).send("you already disliked this video");
				return;
			}

			const response = await db.query(
				`INSERT INTO dislikes (user_id, video_id) VALUES($1, $2);`,
				[userId, videoId]
			);

			if (response.rowsAffected == 0) {
				res.status(400).send("did not add dislike");
				return;
			}

			const r = await db.query(
				`UPDATE videos SET dislikes = dislikes + 1 WHERE id = $1;`,
				[videoId]
			);

			res.status(200).send("disliked the video");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async DeleteDislike(req, res) {
		try {
			const { videoId } = req.body;

			const userId = req.body.user.id;

			const response = await db.query(
				`DELETE FROM dislikes WHERE user_id = $1 AND video_id = $2;`,
				[userId, videoId]
			);
			if (response.rowsAffected == 0) {
				res.status(400).send("did not remove dislike");
				return;
			}
			res.status(200).send("removed dislike from the video");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async DislikesUnderVideo(req, res) {
		try {
			const { videoId } = req.params;

			const response = await db.query(
				`SELECT COUNT(*) FROM dislikes WHERE video_id = $1;`,
				[videoId]
			);

			if (response.rowsAffected == 0) {
				res.status(400).send("did not find dislikes");
				return;
			}

			res.status(200).send(response.rows[0]);
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
}

module.exports = new DislikeController();
