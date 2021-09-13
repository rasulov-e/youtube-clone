const { DataTypes } = require("sequelize");
const db = require("../utils/database"),
	sequelize = db.sequelize,
	Sequelize = db.Sequelize;

const Video = sequelize.define("video", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	url: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	thumbnail: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

module.exports = Video;
