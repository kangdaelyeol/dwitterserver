import * as userRepository from './auth.js';
import { db } from '../db/db.js';

const TWEETS_JOIN = 'SELECT tw.id, tw.text, tw.userId, tw.createAt, us.id, us.url, us.name, us.username FROM tweets as tw JOIN users as us ON tw.userId=us.id'
const TWEETS_ORDERBY = "ORDER BY tw.createAt DESC"
let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: new Date().toString(),
    userId: '1',
  },
];

export async function getAll() {
  //  모든 트윗 정보를 받아오기
  // required user info = username, url, userId, name
  return db.execute(`${TWEETS_JOIN} ${TWEETS_ORDERBY}`).then(result => {
    console.log(result[0]);
    return result[0];
  })
}

export async function getAllByUsername(username) {
  return db.execute(`${TWEETS_JOIN} WHERE us.username=? ${TWEETS_ORDERBY}`, [username]).then(result => {
    console.log(result[0]);
    return result[0];
  });
}

export async function getById(id) {
  return db.execute(`${TWEETS_JOIN} WHERE tw.id=?`, [id]).then(result => {
    console.log(result[0]);
    return result[0][0];
  })
}

export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];

  return db.execute('INSERT INTO tweets (text, userId, createAt) VALUES (?, ?, ?)', [text, userId, new Date()]).then(result => {
    console.log(result[0]);
    return result[0];
  });
}

export async function update(id, text) {
  return db.execute("UPDATE tweets SET text=? WHERE id=?", [text, id]).then(result => {
    return getById(id);
  })
}

export async function remove(id) {
  return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}
