import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserProfile from "./components/UserProfile/UsersProfile";
import Home from "./components/Home/Home";
import Signin from "./components/Auth/Signin/Signin";
import Navbar from "./components/Navbar/Navbar";
import UploadForm from "./components/UploadForm/UploadForm";
import Video from "./components/Video/Video";
import Login from "./components/Auth/Login/Login";

const App = () => {
	const [user, setUser] = useState({
		isLoged: false,
	});

	useEffect(() => {
		if (localStorage.getItem("json-web-token")) {
			setUser({ ...user, isLoged: true });
		}
	}, []);
	return (
		<BrowserRouter>
			<Navbar user={user} />
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/videos">
					<Video />
				</Route>
				<Route path="/upload">
					<UploadForm />
				</Route>
				<Route path="/signin">
					<Signin />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/users/:userId">
					<UserProfile />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
