import React from "react";
import classes from "./Comment.module.css";

const Comment = ({ pfp, name, date, body }) => {
	return (
		<div className={classes.comment}>
			<img
				alt="commentatorPfp"
				src={pfp}
				style={{
					borderRadius: "50%",
					height: "50px",
					margin: "5px",
				}}
			/>
			<div className={classes.data}>
				<div className={classes.name}>
					<h4>{name} </h4> | {date}
				</div>
				<p>{body}</p>
			</div>
		</div>
	);
};

export default Comment;
