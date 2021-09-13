import React from "react";
import { roundIt } from "../../../helpers/rounder";
import Comment from "./Comment/Comment";
import CommentForm from "./CommentForm/CommentForm";
import classes from "./CommentSection.module.css";

const CommentSection = ({ commentCount, comments, userPfp }) => {
	return (
		<div className={classes.commentSection}>
			<hr />
			<h4 style={{ padding: "10px" }}>
				{roundIt(commentCount)} comments
			</h4>

			<CommentForm userPfp="https://yt3.ggpht.com/yti/APfAmoHK2OK8lDcn1SiCQavLsXtuOGzEJ4Q3YUSiXy1sag=s108-c-k-c0x00ffffff-no-rj" />
			{[1, 2, 3, 4, 5, 6].map((index) => (
				<Comment
					pfp="https://yt3.ggpht.com/yti/APfAmoHK2OK8lDcn1SiCQavLsXtuOGzEJ4Q3YUSiXy1sag=s108-c-k-c0x00ffffff-no-rj"
					body="testing the comments yoooo"
					date="01.09.2021"
					name="Rasulov Emirlan"
				/>
			))}
		</div>
	);
};

export default CommentSection;
