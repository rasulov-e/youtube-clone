const express = require("express");
const cors = require("cors");
const app = express();
const upload = require("express-fileupload");

const router = require("./routes");

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(upload());
app.use("/", router);

app.listen(PORT, () => {
	console.log(`Server is up and running on http://localhost:${PORT}`);
});
