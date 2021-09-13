const db = require("../utils/database");

class LikeController {
	async Like(req, res) {
		try {
			
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	}
}

module.exports = new LikeController();
