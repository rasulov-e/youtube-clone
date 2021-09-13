const { DataTypes } = require("sequelize");
const db = require("../utils/database"),
	sequelize = db.sequelize,
	Sequelize = db.Sequelize;

const User = sequelize.define("user", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	username: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	password: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

module.exports = User;
