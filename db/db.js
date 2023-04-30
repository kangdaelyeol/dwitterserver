import mysql from "mysql2";
import { configVal } from "../config.js";

const pool = mysql.createPool({
  host: configVal.db.host,
  database:configVal.db.database,
  user: configVal.db.user,
  password: configVal.db.password
});


export const db = pool.promise();