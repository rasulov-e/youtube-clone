import React from "react";
import classes from "./SubButton.module.css";

const SubButton = ({ isSubed, children, props }) => {
	return (
		<button className={[classes.subBtn, props].join(" ")}>
			<h3>{children} </h3>
		</button>
	);
};

export default SubButton;
