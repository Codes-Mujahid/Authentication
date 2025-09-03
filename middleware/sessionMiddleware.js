import session from "express-session";
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo'

dotenv.config()


export const sessionMiddleware= session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.mongoUrl,
    collectionName: 'sessions'
  })
//   cookie: { secure: true }
});