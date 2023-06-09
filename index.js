const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');

//used for mongo store
const MongoStore = require('connect-mongo')(session); 

//used for sass css
const sassMiddleware = require('node-sass-middleware');

//used for flash messages
const flash = require('connect-flash');

//adding middleware for flash message
const customMware = require('./config/middleware')

//use sass middleware
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

//read through form
app.use(express.urlencoded({extended : false}));

//cookie-parser
app.use(cookieParser());

app.use(express.static('./assets'));
//make the upload path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));

//we need to put it before routes
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

//setup the view engine
app.set('view engine','ejs')
app.set('views','./views')

//after setup view setup passport 
//mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    //todo change the secret before deployment
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store:new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },(err)=>{console.log(err || 'connect mongodb setuo ok!')})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser )

app.use(flash());
app.use(customMware.setFlash)

//use express router
app.use('/',require('./routes/index'))

app.listen(port,(err)=>{
    if(err){
        console.error(`Error in server ${err}`)
        return
    }
    console.log(`Server is running on Port : ${port}`)
})