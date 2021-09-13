import React, { useState } from "react";
import classes from "./CommentForm.module.css";

const CommentForm = ({ userPfp }) => {
	const [isOn, setisOn] = useState(false);
	return (
		<form className={classes.commentForm}>
			<img
				alt="userPfp"
				src={userPfp}
				style={{
					borderRadius: "50%",
					width: "50px",
					margin: "5px",
				}}
			/>
			<input
				className={classes.input}
				type="text"
				placeholder="leave a comment"
				onClick={() => setisOn(true)}
			/>
			{isOn ? (
				<>
					<button className={classes.post} type="submit">
						POST
					</button>
					<button
						className={classes.cancel}
						onClick={() => setisOn(false)}>
						cancel
					</button>
				</>
			) : (
				<></>
			)}
		</form>
	);
};

export default CommentForm;
