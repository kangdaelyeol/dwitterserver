import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { configVal } from './config.js';
import { initSocket } from './connection/socket.js';
import { db, sequelize } from './db/db.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
	res.sendStatus(404);
});

app.use((error, req, res, next) => {
	console.error(error);
	res.sendStatus(500);
});
const server = app.listen(configVal.server.port);

db.getConnection().then((connection) => {
	console.log('db connection!');
});

initSocket(server);
sequelize.sync().then(data => {
	console.log("synce sequelize")
})