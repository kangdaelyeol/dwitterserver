import { Server } from 'socket.io';
import { configVal } from '../config.js';
import jwt from 'jsonwebtoken';

class Socket {
	constructor(server) {
		this.io = new Server(server, {
			cors: '*',
		});

		this.io.use((socket, next) => {
			const token = socket.handshake.auth.token;
      console.log(socket.handshake);
			if (!token) {
				return next(new Error('Authentication Error!'));
			}
      
			jwt.verify(token, configVal.jwt.secret, (error, decoded) => {
				if (error) {
					return next(new Error('Authentication Error!'));
				}
			});
		});
    
    this.io.on("connection", (socket) => {
      console.log("connected successfully!");
    })
	}
}

let socket;
export const initSocket = (server) => {
  if(!socket){
    socket = new Socket(server);
  }
};

export const getSocketIO = () => {
  if(!socket){
    throw new Error("please init socket first !!!");
  }
  return socket.io;
}