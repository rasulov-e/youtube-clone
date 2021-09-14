import React, { useEffect, useState } from "react";
import { getVidesoOf } from "../../../api/videos";
import { computeDate } from "../../../helpers/dateAndTime";
import { roundIt } from "../../../helpers/rounder";
import classes from "./Videos.module.css";

const Videos = ({ userId }) => {
	const [videos, setVideos] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const response = await getVidesoOf(userId);
			setVideos(response.data);
			console.log(response);
		};
		fetch();
	}, []);
	const Video = ({ videoId, date, views }) => {
		return (
			<div className={classes.video}>
				<img
					alt=""
					className={classes.videoThumbnail}
					src={`http://localhost:5000/videos/${videoId}/thumbnail`}
				/>

				<div className={classes.videoInfo}>
					<h3>Test title</h3>
					<div style={{ display: "flex" }}>
						{roundIt(views)} views • {computeDate()}
					</div>
				</div>
			</div>
		);
	};

	if (!videos) {
		return <h1>loading content</h1>;
	}

	return (
		<div className={classes.videos}>
			{videos.map((video) => (
				<a href={`http://localhost:3000/videos/${video.id}`}>
					<Video
						videoId={video.id}
						views={video.views}
						date={video.created_at}
					/>
				</a>
			))}
		</div>
	);
};

export default Videos;
