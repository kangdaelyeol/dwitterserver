import mysql from 'mysql2';
import { configVal } from '../config.js';
import { Sequelize } from 'sequelize';
const {database, host, user, password } = configVal.db;
export const sequelize = new Sequelize(database, user, password, {
	host,
	dialect: 'mysql',
});



const pool = mysql.createPool({
	host: configVal.db.host,
	database: configVal.db.database,
	user: configVal.db.user,
	password: configVal.db.password,
});

export const db = pool.promise();