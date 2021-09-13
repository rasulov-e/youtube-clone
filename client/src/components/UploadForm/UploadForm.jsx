import React, { useState } from "react";
import { uploadVideo } from "../../api/videos";
import { computeDate } from "../../helpers/dateAndTime";
import classes from "./UploadForm.module.css";

const UploadForm = () => {
	const [input, setInput] = useState({
		userId: "1",
		date: computeDate(),
		title: "",
		description: "",
		video: null,
		thumbnail: null,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("video", input.video);
		formData.append("description", input.description);
		formData.append("title", input.title);
		formData.append("date", input.date);
		formData.append("userId", input.userId);
		formData.append("thumbnail", input.thumbnail);

		const response = await uploadVideo(formData);
		console.log(response);
	};

	return (
		<div className={classes.uploadform}>
			<form className={classes.form} onSubmit={handleSubmit}>
				<input
					className={classes.input}
					type="text"
					placeholder="title"
					name="title"
					value={input.title}
					onChange={(e) =>
						setInput({
							...input,
							title: e.target.value,
						})
					}
				/>
				<input
					className={classes.input}
					type="text"
					placeholder="description"
					name="description"
					value={input.description}
					onChange={(e) =>
						setInput({
							...input,
							description: e.target.value,
						})
					}
				/>
				<input
					className={classes.input}
					type="file"
					placeholder="choose video"
					name="video"
					onChange={(e) =>
						setInput({ ...input, video: e.target.files[0] })
					}
				/>
				<input
					className={classes.input}
					type="file"
					placeholder="choose video"
					name="thumbnail"
					onChange={(e) =>
						setInput({ ...input, thumbnail: e.target.files[0] })
					}
				/>
				<button className={classes.btn} type="submit">
					POST
				</button>
			</form>
		</div>
	);
};

export default UploadForm;
