import axios from "axios";

export const fetchVideos = () => axios.get("http://localhost:5000/videos");
export const uploadVideo = (formData) =>
	axios.post("http://localhost:5000/videos", formData, {
		headers: {
			"Content-Type": "mulripart/form-data",
		},
	});
export const getVideoInfo = (id) =>
	axios.get(`http://localhost:5000${id}/videoInfo`);
// export const fetchPosts = () => API.get("/posts");
// export const createPost = (newPost) => API.post("/posts", newPost);
// export const updatePost = (id, updatedPost) =>
// 	API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// export const signIn = (formData) => API.post("/users/signin", formData);
// export const signUp = (formData) => API.post("/users/signup", formData);
