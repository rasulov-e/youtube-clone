import React from "react";
import SubButton from "../../UI/SubButton/SubButton";
import classes from "./UsersProfile.module.css";
import Videos from "./Videos/Videos";

const Channel = () => {
	let currenturl = window.location.pathname;

	return (
		<div className={classes.channel}>
			<img
				className={classes.hero}
				alt="channetlThumbnail"
				src={`http://localhost:5000${currenturl}/hero`}
			/>

			<div className={classes.user}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<img
						alt="authorPfp"
						src={`http://localhost:5000${currenturl}/avatar`}
						style={{
							borderRadius: "50%",
							height: "80px",
							margin: "10px",
						}}
					/>
					<div>
						<h2>The damn Enkidu</h2>
						<p>1.84 million subscribers</p>
					</div>
				</div>

				<SubButton className={classes.bbaaa}>SUBSCRIBE</SubButton>
			</div>

			<Videos />
		</div>
	);
};

export default Channel;
