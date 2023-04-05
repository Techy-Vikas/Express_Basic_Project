const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')


//authentication using passport 
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async (email,password,done)=>{
        //find a user and establish the identity
        var user = await User.findOne({email : email}).catch(err=>console.log(err));

        if(!user || user.password != password ){
            console.log('Invalid Username/Password');
            return done(null,false);//false means not authorized 
        }
        return done(null,user);//user means it is authorized
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
})


//deserializing the user from the key in the cookies
passport.deserializeUser(async(id,done)=>{
    var user =await User.findById({_id : id}).catch(err=>console.log(err));
    if(user){return done(null,user);}
})

//check if the user is authenticated
passport.checkAuthentication = (req,res,next) => {
    //if the user is signed in, then pass on the request to the next function(controller;s action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport 
