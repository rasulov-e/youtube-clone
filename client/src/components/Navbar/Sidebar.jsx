import React from "react";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import classes from "./Navbar.module.css";
import Sub from "./Subs/Subs";

const Sidebar = () => {
	return (
		<div className={classes.sidebar}>
			<div></div>
			<div></div>

			<div className={classes.lists}>
				<a href="http://localhost:3000/upload">
					<h4 style={{ display: "flex", alignItems: "center" }}>
						<VideoCallIcon /> Publish video
					</h4>
				</a>

				<h4 style={{ display: "flex", alignItems: "center" }}>
					<ThumbUpAltIcon /> LIKED
				</h4>
				<h4 style={{ display: "flex", alignItems: "center" }}>
					<BookmarkIcon /> WATCH LATER
				</h4>
			</div>

			<hr style={{ border: "1px solid gray" }} />

			<div className={classes.subscriptions}>
				<h4 style={{ display: "flex", alignItems: "center" }}>
					<SubscriptionsIcon /> SUBSCRIPTIONS
				</h4>

				<div>
					<Sub />
					<Sub />
					<Sub />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
