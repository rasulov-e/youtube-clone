import React from "react";
import classes from "./Video.module.css";

const Video = ({ videoName, thumbnail, authorName, authorPfp, views }) => {
	const roundViews = (x) => {
		if (x > 1000000) return x / 1000000 + "mil";
		if (x > 1000) return x / 1000 + "k";
	};
	const checkTitle = (text, length) => {
		if (text == null) {
			return "";
		}
		if (text.length <= length) {
			return text;
		}
		text = text.substring(0, length);
		let last = text.lastIndexOf(" ");
		text = text.substring(0, last);
		return text + "...";
	};
	return (
		<div className={classes.video}>
			<img
				className={classes.thumbnail}
				alt="video-thumbnail"
				src={thumbnail}
			/>
			<div className={classes.description}>
				<img
					alt="author-pfp"
					src={authorPfp}
					style={{ borderRadius: "50%", height: "40px" }}
				/>

				<div className={classes.data}>
					<h4 className={classes.title}>
						{checkTitle(videoName, 40)}
					</h4>
					{authorName} {roundViews(views)} views
				</div>
			</div>
		</div>
	);
};

export default Video;
