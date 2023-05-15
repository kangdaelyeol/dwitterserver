import { db } from '../db/db.js';

// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm

export async function findByUsername(username) {
	return db.execute('SELECT * FROM users WHERE username=?',[username]).then(result =>
    result[0][0]);
}

export async function findById(id) {
	return db.execute('SELECT * FROM users WHERE id=?', [id]).then(result => result[0][0]);
}

export async function createUser(user) {
	const { username, password, name, email, url } = user;
	console.log('CreateUser');
	return db.execute(
		'INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)',
		[username, password, name, email, url]
	).then((result) => {
		// console.log(result);
	});
}
