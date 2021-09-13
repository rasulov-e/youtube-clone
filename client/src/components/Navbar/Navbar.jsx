import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";

import classes from "./Navbar.module.css";
import logo from "../../images/logo.png";

const Navbar = () => {
	const [isSmallSearch, setisSmallSearch] = useState(true);

	const handleisSmallSearch = () => {
		setisSmallSearch(!isSmallSearch);
	};

	return (
		<nav className={classes.navbar} to="/">
			{isSmallSearch ? (
				<>
					<Link to="/">
						<div className={classes.logo}>
							<img
								alt="logo"
								src={logo}
								style={{ height: "40px" }}
							/>
							enkiduHUB
						</div>
					</Link>

					<form className={classes.search}>
						<input
							className={classes.searchInput}
							type="text"
							name="search"
							placeholder="Search for video"
						/>
						<button className={classes.searchBtn} type="submit">
							<SearchIcon />
						</button>
					</form>
					<div className={classes.user}>
						<button
							className={classes.openSearchOnSmall}
							onClick={handleisSmallSearch}>
							<SearchIcon />
						</button>
						<AccountCircleIcon />
					</div>
				</>
			) : (
				<>
					<button
						className={classes.closeSmallInput}
						onClick={handleisSmallSearch}>
						<CloseIcon />
					</button>
					<form className={classes.smallSearch}>
						<input
							className={classes.searchInput}
							type="text"
							name="search"
							placeholder="Search for video"
						/>
						<button className={classes.searchBtn} type="submit">
							<SearchIcon />
						</button>
					</form>
				</>
			)}
		</nav>
	);
};

export default Navbar;
