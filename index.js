//          MODULES
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import {main, registerForm, loginForm, userRegistration, checkAuth, showProfile, logOut} from './controller/controller.js';
import { sessionMiddleware } from './middleware/sessionMiddleware.js';
import {isLogged} from './middleware/isLogged.js'
import passport from 'passport';
import {initializePassport} from './middleware/passport.js'
import {initializePassportGoogle} from './middleware/passport_Google.js'

// import {flashMsg} from './middleware/flash.js';
import flash from 'connect-flash'
import {user} from './middleware/user.js'
dotenv.config()
const app= express();
app.set('trust proxy', 1) 

//          BASIC SETUP
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({extended: true}));

//          MIDDLEWARE
app.use(sessionMiddleware);
initializePassport()
initializePassportGoogle()
app.use(passport.initialize());
app.use(passport.session());
app.use(user);
app.use(flash())
app.use((req, res, next)=> {
    res.locals.success= req.flash('success')
    res.locals.error= req.flash('error')
    next()
})
//          ROUTES
app.get('/', main);
app.get('/register', registerForm);
app.get('/login', isLogged, loginForm);
app.get('/profile', showProfile)
app.get('/logout', logOut);
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' , successRedirect: '/profile'}),
);


app.post('/register', userRegistration)
app.post('/login', checkAuth);


//          DATABASE
mongoose.connect(process.env.DATABASE,
    {dbName: 'Authentication'}
)
  .then(() => console.log('Database Connected!'))
  .catch((err)=> {console.log(err.message)});

//          SERVER
app.listen(8080, ()=> {
    console.log(`server unning on http://localhost:8080`);
})