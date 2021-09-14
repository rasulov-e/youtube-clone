import axios from "axios";

const url = "http://localhost:5000";

export const fetchVideos = () => axios.get(url + "/videos");
export const uploadVideo = (formData) =>
	axios.post(url + "/videos", formData, {
		headers: {
			"Content-Type": "mulripart/form-data",
		},
	});
export const getVideoInfo = (id) => axios.get(`${url}${id}/videoInfo`);
export const getVidesoOf = (userId) =>
	axios.get(url + "/videos/users/" + userId);

export const ping = () =>
	axios.get(url + "/ping", {
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjMxNjE2MDY5LCJleHAiOjE2MzE3MDI0Njl9.YwGDBLRRcUNKJuuF3mMulpcCfpnUQSCqrgFzzZnZ9Hc",
		},
	});
// export const fetchPosts = () => API.get("/posts");
// export const createPost = (newPost) => API.post("/posts", newPost);
// export const updatePost = (id, updatedPost) =>
// 	API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// export const signIn = (formData) => API.post("/users/signin", formData);
// export const signUp = (formData) => API.post("/users/signup", formData);
