const Router = require("express");
const router = new Router();
const { check } = require("express-validator");

const AuthController = require("./controllers/auth");
const CommentController = require("./controllers/comments");
const UserController = require("./controllers/users");
const VideoController = require("./controllers/videos");
const SubController = require("./controllers/subs");

router.post(
	"/auth/registration",
	[
		check("username", "The username cannot be empty").notEmpty(),
		check(
			"password",
			"Password cannot be less than 4 simbols or more than 10"
		).isLength({ min: 4, max: 10 }),
	],
	AuthController.registration
);
router.post("/auth/login", AuthController.login);

router.post("/user/", UserController.createUser);
router.get("/user/:id/hero", UserController.serveThumbnail);
router.get("/user/:id/avatar", UserController.serveProfilePicture);

router.post("/videos/", VideoController.createVideo);
router.get("/videos/", VideoController.getVideos);
router.get("/videos/:id", VideoController.serveVideo);
router.get("/videos/:id/videoInfo", VideoController.getVideoInfo);
router.get("/videos/:id/thumbnail", VideoController.serveThumbnail);

router.get("/comments/", CommentController.GetComments);
router.post("/comments/", CommentController.CreateComment);
router.get("/comments/video/:id", CommentController.FindCommentsForVideo);

router.post("/sub/", SubController.Follow);
router.delete("/sub/", SubController.Unfollow);
router.get("/sub/:id", SubController.GetSubscriptions);

module.exports = router;
