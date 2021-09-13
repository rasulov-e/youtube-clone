import React, { useEffect, useState } from "react";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ShareIcon from "@material-ui/icons/Share";

import classes from "./Video.module.css";
import Description from "./Description/Description";
import CommentSection from "./Comments/CommentSection";
import { getVideoInfo } from "../../api/videos";

const Video = () => {
	const [video, setVideo] = useState(null);
	let currenturl = window.location.pathname;

	const getVideo = async () => {
		try {
			const data = await getVideoInfo(currenturl).catch((err) => {
				console.log(err);
				return (
					<div className={classes.video}>
						this video does not exits
					</div>
				);
			});
			console.log(data);
			setVideo(data.data);
		} catch (err) {
			return <>the video does not exits</>;
		}
	};
	useEffect(() => {
		getVideo();
		// eslint-disable-next-line
	}, []);

	if (!video) {
		return <div className={classes.video}>loading</div>;
	}
	return (
		<div className={classes.video}>
			<video
				className={classes.content}
				controls
				style={{ background: "black" }}>
				<source
					src={`http://localhost:5000${currenturl}`}
					type="video/mp4"
				/>
			</video>
			<article className={classes.wrapper}>
				<div className={classes.title}>
					<div>
						<h2>{video.title}</h2>
						{video.views} views • 7 september 2021
					</div>
					<div className={classes.titleUI}>
						<ThumbUpAltOutlinedIcon /> 0
						<ThumbDownOutlinedIcon /> 0
						<ShareIcon />
					</div>
				</div>

				<Description
					authorPfp="https://yt3.ggpht.com/ytc/AKedOLTcIl6kKt3lEPJEySUf_hpHiKDKiFeo9eWPReLysQ=s48-c-k-c0x00ffffff-no-rj"
					body={video.description}
				/>

				<CommentSection commentCount="0" />
			</article>
		</div>
	);
};

export default Video;
