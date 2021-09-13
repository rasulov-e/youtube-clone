import React from "react";
import { computeDate } from "../../../helpers/dateAndTime";
import { roundIt } from "../../../helpers/rounder";
import classes from "./Videos.module.css";

const Videos = () => {
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

	return (
		<div className={classes.videos}>
			{[12, 12, 12].map((video) => (
				<a href="http://localhost:3000/videos/12">
					<Video videoId={video} views="1344044" />
				</a>
			))}
		</div>
	);
};

export default Videos;
