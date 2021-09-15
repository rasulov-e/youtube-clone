const Router = require("express");
const router = new Router();
const { check } = require("express-validator");

const AuthController = require("./controllers/auth");
const CommentController = require("./controllers/comments");
const UserController = require("./controllers/users");
const VideoController = require("./controllers/videos");
const SubController = require("./controllers/subs");
const LikeController = require("./controllers/likes");
const DislikeController = require("./controllers/dislikes");
const AuthMiddleware = require("./middleware/auth");

router.get("/ping/", AuthMiddleware, (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

router.post(
	"/auth/registration/",
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

// router.post("/user/", UserController.createUser);
router.get("/users/:id/hero", UserController.serveThumbnail);
router.get("/users/:id/avatar", UserController.serveProfilePicture);
router.get("/users/avatar", AuthMiddleware, UserController.serveMyAvatar);

router.post("/videos/", AuthMiddleware, VideoController.createVideo);
router.get("/videos/", VideoController.getVideos);
router.get("/videos/users/:id", VideoController.getVideosOf);
router.get("/videos/:id", VideoController.serveVideo);
router.get("/videos/:id/videoInfo", VideoController.getVideoInfo);
router.get("/videos/:id/thumbnail", VideoController.serveThumbnail);

router.get("/comments/", CommentController.GetComments);
router.post("/comments/", AuthMiddleware, CommentController.CreateComment);
router.get("/comments/video/:id", CommentController.FindCommentsForVideo);

router.post("/subs/", AuthMiddleware, SubController.Follow);
router.delete("/subs/", AuthMiddleware, SubController.Unfollow);
router.get("/subs/:id", SubController.GetSubscriptions);

router.post("/likes/", AuthMiddleware, LikeController.Like);
router.delete("/likes/", AuthMiddleware, LikeController.DeleteLike);
// router.get("/likes/:videoId", LikeController.LikesUnderVideo);

router.post("/dislikes/", AuthMiddleware, DislikeController.Dislike);
router.delete("/dislikes/", AuthMiddleware, DislikeController.DeleteDislike);

module.exports = router;
