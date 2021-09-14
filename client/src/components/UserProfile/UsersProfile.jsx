import React from "react";
import { useParams } from "react-router";

import SubButton from "../../UI/SubButton/SubButton";
import classes from "./UsersProfile.module.css";
import Videos from "./Videos/Videos";

const Channel = () => {
	const { userId } = useParams();

	return (
		<div className={classes.channel}>
			<img
				className={classes.hero}
				alt="channetlThumbnail"
				src={`http://localhost:5000/users/${userId}/hero`}
			/>

			<div className={classes.user}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<img
						alt="authorPfp"
						src={`http://localhost:5000/users/${userId}/avatar`}
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

			<Videos userId={userId} />
		</div>
	);
};

export default Channel;
