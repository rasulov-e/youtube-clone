import React, { useState } from "react";
import { loginUser } from "../../../api/auth";
import classes from "./Login.module.css";

const Login = () => {
	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	const submitHandler = (e) => {
		e.preventDefault();
		try {
			const login = async () => {
				const { data } = await loginUser(form.username, form.password);

				localStorage.setItem("json-web-token", data.token);
			};

			login();
		} catch (error) {
			console.log(error);
			return;
		}
	};

	return (
		<form className={classes.login} onSubmit={submitHandler}>
			<input
				type="text"
				placeholder="youre username"
				onChange={(e) => setForm({ ...form, username: e.target.value })}
			/>

			<input
				type="password"
				placeholder="youre password"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>

			<button type="submit" className={classes.btn}>
				Register
			</button>
		</form>
	);
};

export default Login;
