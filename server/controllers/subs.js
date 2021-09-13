const db = require("../utils/database");

class SubController {
	async Follow(req, res) {
		try {
			const { followerId, userId } = req.body;

			const response = await db.query(
				`INSERT INTO subs(follower_id, user_id) VALUES($1, $2);`,
				[followerId, userId]
			);

			if (response.rowsAffected == 0) {
				console.log(response);
				res.status(400).send(response);
				return;
			}

			res.status(200).send("you subbed successfuly");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async Unfollow(req, res) {
		try {
			const { followerId, userId } = req.body;

			const response = await db.query(
				`DELETE FROM subs WHERE follower_id = $1 AND user_id = $2;`,
				[followerId, userId]
			);

			if (response.rowsAffected == 0) {
				res.status(400).send("did not delete any followings");
				return;
			}

			res.status(200).send("unfollowed");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async GetSubscriptions(req, res) {
		try {
			const { id } = req.params;

			const response = await db.query(
				`SELECT * FROM subs WHERE follower_id = ${id}`
			);

			res.status(200).send(response.rows);
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
	async CheckIfSubbed(req, res) {
		try {
			const { myId, userId } = req.body;

			const response = await db.query(
				`SELECT * FROM subs WHERE follower_id = ${myId} AND user_id = ${userId}`
			);

			if (response.rowsAffected == 0) {
				console.log(response);
				res.status(400).send(response);
				return;
			}

			if (response.rows) {
				res.status(200).send("yes");
				return;
			}
			res.status(200).send("no");
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
}

module.exports = new SubController();
