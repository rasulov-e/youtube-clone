const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: "enkidu",
	host: "localhost",
	port: 5432,
	database: "youtube-clone",
});

module.exports = pool;
