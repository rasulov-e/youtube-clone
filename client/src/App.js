import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserProfile from "./components/UserProfile/UsersProfile";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import UploadForm from "./components/UploadForm/UploadForm";
import Video from "./components/Video/Video";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
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
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/users">
					<UserProfile />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
