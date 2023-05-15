import { db } from '../db/db.js';
import { DataTypes } from 'sequelize';
import { sequelize } from '../db/db.js';

// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm

const User = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING(45),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		url: DataTypes.STRING(128),
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

export async function findByUsername(username) {
	return User.findOne({
		where: {
			username,
		},
	}).then((result) => {
		console.log(result);
		return result;
	});
	return db
		.execute('SELECT * FROM users WHERE username=?', [username])
		.then((result) => result[0][0]);
}

export async function findById(id) {
	return User.findByPk(id).then((result) => {
		// console.log(result)
		return result.dataValues;
	});
	return db
		.execute('SELECT * FROM users WHERE id=?', [id])
		.then((result) => result[0][0]);
}

export async function createUser(user) {
	const { username, password, name, email, url } = user;

	console.log('CreateUser');
	return User.create({ username, password, name, email, url }).then((value) => {
		console.log(value);
		return value;
	});
	return db
		.execute(
			'INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)',
			[username, password, name, email, url]
		)
		.then((result) => {
			// console.log(result);
		});
}
