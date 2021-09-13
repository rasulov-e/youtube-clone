import React from "react";
import classes from "./Subs.module.css";

const Sub = () => {
	return (
		<div className={classes.sub}>
			<img
				alt="userLogo"
				style={{ height: "30px", paddingRight: "10px" }}
				src="https://yt3.ggpht.com/ytc/AKedOLTcIl6kKt3lEPJEySUf_hpHiKDKiFeo9eWPReLysQ=s88-c-k-c0x00ffffff-no-rj"
			/>
			Tiler creator
		</div>
	);
};

export default Sub;
