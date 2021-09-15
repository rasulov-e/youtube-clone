import React, { useState } from "react";
import { registerUser } from "../../../api/auth";
import classes from "./Signin.module.css";

const Signin = () => {
	const [registrationErr, setRegistrationErr] = useState(false);

	const [form, setForm] = useState({
		username: "",
		password: "",
		repeatPassword: "",
		email: "",
		avatar: null,
		hero: null,
	});

	const [formValidation, setFormValidation] = useState({
		username: true,
		password: true,
		repeatPassword: true,
		email: true,
		avatar: true,
		hero: true,
	});

	const submitHandler = (e) => {
		e.preventDefault();

		if (form.username === "") {
			setFormValidation({ ...formValidation, username: false });
			return;
		}
		setFormValidation({ ...formValidation, username: true });

		if (form.password.length < 4 || form.password.length > 10) {
			setFormValidation({ ...formValidation, password: false });
			return;
		}
		setFormValidation({ ...formValidation, password: true });

		if (form.password !== form.repeatPassword) {
			setFormValidation({ ...formValidation, repeatPassword: false });
			return;
		}
		setFormValidation({ ...formValidation, repeatPassword: true });

		if (form.email === "") {
			setFormValidation({ ...formValidation, email: false });
			return;
		}
		setFormValidation({ ...formValidation, email: true });

		if (formValidation.avatar === null) {
			setFormValidation({ ...formValidation, avatar: false });
			return;
		}
		setFormValidation({ ...formValidation, avatar: true });

		if (formValidation.hero === null) {
			setFormValidation({ ...formValidation, hero: false });
			return;
		}
		setFormValidation({ ...formValidation, hero: true });

		const signin = async () => {
			try {
				const formData = new FormData();

				formData.append("username", form.username);
				formData.append("password", form.password);
				formData.append("email", form.email);

				formData.append("avatar", form.avatar);
				formData.append("hero", form.hero);

				const data = await registerUser(formData);
				console.log(data);
			} catch (error) {
				console.log(error);
				setRegistrationErr(true);
			}
		};

		signin();

		console.log(form);
		console.log(formValidation);
	};

	return (
		<form className={classes.signin} onSubmit={submitHandler}>
			{registrationErr ? (
				<h1>
					Error ocured. Try again a little later or check youre inputs
				</h1>
			) : null}
			<input
				type="text"
				placeholder="youre username"
				onChange={(e) => setForm({ ...form, username: e.target.value })}
			/>
			{formValidation.username ? null : (
				<label style={{ color: "red" }}>username cant be empty</label>
			)}
			<input
				type="password"
				placeholder="youre password"
				onChange={(e) => setForm({ ...form, password: e.target.value })}
			/>
			{formValidation.password ? null : (
				<label style={{ color: "red" }}>
					passwords should have at least 4 simbols and no more than 10
				</label>
			)}
			<input
				type="password"
				placeholder="repeat youre password"
				onChange={(e) =>
					setForm({ ...form, repeatPassword: e.target.value })
				}
				name="repeatPassword"
			/>
			{formValidation.repeatPassword ? null : (
				<label htmlFor="password" style={{ color: "red" }}>
					passwords dont match
				</label>
			)}
			<input
				type="email"
				placeholder="youre email"
				onChange={(e) => setForm({ ...form, email: e.target.value })}
			/>
			{formValidation.email ? null : (
				<>
					<label style={{ color: "red" }}>
						email cannot be empty
					</label>
					<br />
				</>
			)}

			<input
				type="file"
				onChange={(e) =>
					setForm({ ...form, avatar: e.target.files[0] })
				}
				accept="image/*"
			/>
			{formValidation.avatar ? (
				<label htmlFor="hero">
					choose avatar for youre user profile*
				</label>
			) : (
				<label style={{ color: "red" }}>
					you have to choose avatar
				</label>
			)}
			<br />
			<input
				type="file"
				id="hero"
				onChange={(e) => setForm({ ...form, hero: e.target.files[0] })}
				accept="image/*"
			/>
			{formValidation.hero ? (
				<label htmlFor="hero">
					choose hero for youre user profile*
				</label>
			) : (
				<label style={{ color: "red" }}>you have to choose hero</label>
			)}
			<br />

			<button type="submit" className={classes.btn}>
				Register
			</button>
		</form>
	);
};

export default Signin;
