import dotenv from 'dotenv';

// when you run that function, it will make your computer(OS) set environment variables
// referring to '.env' file
// so you can find env variables at process.env location
dotenv.config();

// you have to make it safe in case you set env wrong,
const checkEnv = (envKey, defaultValue = undefined) => {
	// check whether if the corresponding val exists or not
	// if it doesn't exist, put the given defaultValue
	// defaultValue(param) is an option, if you wanna make sure the value of env,
	// you can put value as defaultValue.
	const value = process.env[envKey] || defaultValue;
	// JS perceive undefined as null, they are the same format of data
	if (value == null) {
		throw new Error(`Invalid environment variable - ${envKey}`);
	}
	return value;
};

export const configVal = {
	jwt: {
		secret: checkEnv('JWT_SECRET'),
		// parseInt - In person, you have to set the type of value,
		// this is because environment variables will be returned as a format of String from process.env
		expiresInSec: parseInt(checkEnv('JWT_EXPIRESINSEC', 86400)),
	},
	bcrypt: {
		saltRound: parseInt(checkEnv('BCRYPT_SALTROUND', 12)),
	},
  server: {
    port: parseInt(checkEnv("PORT", 8080))
  },
	db: {
		host: checkEnv("DB_HOST"),
		user: checkEnv("DB_USER"),
		database: checkEnv("DB_DATABASE"),
		password: checkEnv("DB_PASSWORD")
	}
};
