import React, { useState } from "react";
import SubButton from "../../../UI/SubButton/SubButton";
import classes from "./Description.module.css";

const Description = ({ body, authorName, authorPfp, authorID }) => {
	const [isOpened, setisOpened] = useState(false);
	return (
		<div className={classes.description}>
			<div className={classes.authorData}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<img
						alt="authorPfp"
						src={authorPfp}
						style={{
							borderRadius: "50%",
							height: "50px",
							margin: "5px",
						}}
					/>
					<h3>FireshipIO</h3>
				</div>

				<SubButton className={classes.subscribe}>SUBSCRIBE</SubButton>
			</div>
			<div className={classes.text}>
				{isOpened ? (
					<>
						<p style={{ whiteSpace: "pre-line" }}>{body}</p>
						<button
							className={classes.openclose}
							onClick={() => setisOpened(false)}>
							CLOSE
						</button>
					</>
				) : (
					<button
						className={classes.openclose}
						onClick={() => setisOpened(true)}>
						OPEN
					</button>
				)}
			</div>
		</div>
	);
};

export default Description;
