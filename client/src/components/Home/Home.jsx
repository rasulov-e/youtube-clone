import React from "react";
import Sidebar from "../Navbar/Sidebar";
import VideoFeed from "../VideoFeed/VideoFeed";

import classes from "./Home.module.css";

const Home = () => {
	return (
		<div className={classes.home}>
			<div className={classes.sideContent}>
				<Sidebar />
			</div>
			<div className={classes.mainContent}>
				<VideoFeed />
			</div>
		</div>
	);
};

export default Home;
