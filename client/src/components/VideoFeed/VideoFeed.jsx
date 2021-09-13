import React, { useEffect, useState } from "react";
import { fetchVideos } from "../../api/videos";
import Video from "./Video/Video";

import classes from "./VideoFeed.module.css";

const VideoFeed = () => {
	const [videos, setVideos] = useState(null);

	const getVideos = async () => {
		const { data } = await fetchVideos();
		setVideos(data);
	};

	useEffect(() => {
		getVideos();
		console.log(videos);
		// eslint-disable-next-line
	}, []);

	if (!videos) {
		return <>loading videos</>;
	}

	console.log(videos);
	return (
		<div className={classes.videoFeed}>
			{videos.map((video) => (
				<a
					href={`http://localhost:3000/videos/${video.id}`}
					key={video.id}>
					<Video
						authorName="Сергей Пузанков"
						videoName={video.title}
						authorPfp="https://yt3.ggpht.com/ytc/AKedOLSdasD1_FfDPcM0hY9vZgiI7w0pTmVwKbYhLSA_=s68-c-k-c0x00ffffff-no-rj"
						thumbnail={`http://localhost:5000/videos/${video.id}/thumbnail`}
						views="38000"
						releaseDate="01.01.21"
						key={video.id}
					/>
				</a>
			))}
		</div>
	);
};

export default VideoFeed;
