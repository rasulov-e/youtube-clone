import axios from "axios";
import { url } from ".";

export const registerUser = (formData) =>
	axios.post(url + "/auth/registration/", formData, {
		headers: {
			"Content-Type": "mulripart/form-data",
		},
	});

export const loginUser = (username, password) =>
	axios.post(url + "/auth/login/", {
		username: username,
		password: password,
	});
