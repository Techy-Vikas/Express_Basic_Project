const User = require('../models/user');

module.exports.profile = async (req,res) =>{
    User.findById(req.params.id).then(user=>{
        return res.render('users_profile.ejs',{
            title : 'User Profile',
            profile_user: user
        })
    }).catch(err=>{console.log(err)});
   
}

module.exports.update = (req,res) => {
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body).then(user=>{
            return res.redirect('/');
        }).catch(err=>console.log(err))
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    return res.render('user_sign_up' ,{
        title : "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
     }
    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create =async (req,res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }  
   var user=await User.findOne({email : req.body.email}).catch(err=>{console.log(err)});
//    console.log('user',user)
    // ,(err,user)=>{
    //     if(err){console.log('error in finding user in signing up'); return}

        if(!user){
           await User.create(req.body).catch(err=>{console.log(err)}); 
                // , (err,user) => {
                // if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            // })
        }else{
            return res.redirect('back');
        }
    // })  
}

//sign in and create a session for the user
module.exports.createSession = (req,res) => {
    //todo later
    req.flash('success','Logged in Successfully!');
    return res.redirect('/')
}

module.exports.destroySession = (req,res) => {
    //this function is of passport
    req.logout(function(err) {
        if (err) { return next(err); }
    req.flash('success','You have logged out!');
        res.redirect('/');
      });
    
   
}