const express = require("express");
const fs = require("fs");
const db = require("../utils/database");
class VideoController {
	async createVideo(req, res) {
		if (req.files) {
			const video = req.files.video;
			const thumbnail = req.files.thumbnail;

			video.mv("../database/videos/" + video.name);
			thumbnail.mv("../database/thumbnails/" + thumbnail.name);
			const { title, userId, description } = req.body;
			console.log(title, userId);

			const now = new Date();
			const newVideo = await db.query(
				`INSERT INTO videos ( url, thumbnail, created_at, updated_at, user_id, title, description, views) VALUES ($1, $2, $3, $4, $5, $6, $7, 0) RETURNING *;`,
				[
					video.name,
					thumbnail.name,
					now,
					now,
					userId,
					title,
					description,
				]
			);
		}

		console.log(req.body);
		console.log(req.files);
		res.send("video was uploaded");
	}

	async getVideos(req, res) {
		const videos = await db.query(`SELECT * FROM videos;`);
		res.status(201).send(videos.rows);
	}

	async getVideoInfo(req, res) {
		const { id } = req.params;

		const video = await db.query(`SELECT * FROM videos WHERE id = $1`, [
			id,
		]);
		if (video.rows[0]) {
			res.send(video.rows[0]);
		}
		res.status(400).send("video does not exits");
	}

	async serveVideo(req, res) {
		const { id } = req.params;

		const range = req.headers.range;
		if (!range) {
			res.status(400).send("Requires Range header");
		}

		const videoUrl = await db.query(
			"SELECT url FROM videos WHERE id = $1;",
			[id]
		);

		if (videoUrl.rows[0]) {
			const dbResponse = await db.query(
				`UPDATE videos SET views = views + 1 WHERE id = $1;`,
				[id]
			);

			// get video stats (about 61MB)
			const videoPath = `../database/videos/${videoUrl.rows[0].url}`;
			const videoSize = fs.statSync(videoPath).size;

			// Parse Range
			// Example: "bytes=32324-"
			const CHUNK_SIZE = 10 ** 6; // 1MB
			const start = Number(range.replace(/\D/g, ""));
			const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

			// Create headers
			const contentLength = end - start + 1;
			const headers = {
				"Content-Range": `bytes ${start}-${end}/${videoSize}`,
				"Accept-Ranges": "bytes",
				"Content-Length": contentLength,
				"Content-Type": "video/mp4",
			};

			// HTTP Status 206 for Partial Content
			res.writeHead(206, headers);

			// create video read stream for this particular chunk
			const videoStream = fs.createReadStream(videoPath, { start, end });

			// Stream the video chunk to the client
			videoStream.pipe(res);
		} else {
			res.status(400).send("video does not exists");
		}
	}

	async serveThumbnail(req, res) {
		const { id } = req.params;

		// get video stats (about 61MB)
		const thumbnail = await db.query(
			`SELECT thumbnail FROM videos WHERE id = $1`,
			[id]
		);

		if (thumbnail.rows[0]) {
			const imagePath = `../database/thumbnails/${thumbnail.rows[0].thumbnail}`;

			const headers = {
				"Content-Type": "image/jpg",
			};

			// HTTP Status 206 for Partial Content
			res.writeHead(206, headers);

			// create video read stream for this particular chunk
			const img = fs.readFileSync(imagePath);
			res.end(img, "binary");
		} else {
			res.send("no such video");
		}

		// Stream the video chunk to the client
	}
}

module.exports = new VideoController();
