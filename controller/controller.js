import {User} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

const saltRounds = 10;

export const main= (req, res)=> {
    res.render('index')
};

export const registerForm= (req, res)=> {
    res.render('register')
};

export const loginForm=  (req, res)=> {
    res.render('login')
};

export const userRegistration= async(req, res)=> {
    try{
        let {username, email}= req.body;
        let checkDB= await User.find({ $or: [{username, email}]});
        if(checkDB.length > 0) {
            req.flash('success', 'User data already in use')
        };
        bcrypt.hash(req.body.password, saltRounds, async(err, hash)=> {
            let newUser= new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            await newUser.save();
            console.log(newUser);
            req.flash('success', 'Registration successfull! Please login to continue.')
            res.redirect('/login')
        });
    } catch(err) {
        req.flash('success', 'Server error')
    }
};

export const showProfile=  (req, res)=> {
    if(req.isAuthenticated()){
        return res.render('profile', {user: req.user})
    };
    res.redirect('/login')
}

export const checkAuth=  
  passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/profile'})


export const logOut= (req, res, next) => {
  req.logout((err)=> {
    if (err) { 
      return next(err); 
    }
    res.redirect('/');
  });
}