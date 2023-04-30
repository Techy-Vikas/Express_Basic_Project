const passport = require('passport');
const GoogleAuthStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new GoogleAuthStrategy({
    clientID: '940994165416-i4jh9kc36dnjqgjvjk1nefoprcdov7l7.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback',
    // scope: ['profile', 'email'],
    // passReqToCallback : true
},
async function(accessToken , refreshToken , profile , done){
    console.log('profile',profile);
    //find a user
   let user = await User.findOne({email : profile.emails[0].value}).catch(err=>{console.log('error in google strategy passport' , err);})
        if(user){
            //if found set the user as req.user
            return done(null,user);
        }
        else{
            //if not found, create the user and set it as req.user
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            }).then((data=>{
                // console.log('data',data);
                return done(null,data)
            })).catch(err=>{console.log('Error in creating user google strategy-passport',err);})
        }
}
))

module.exports = passport