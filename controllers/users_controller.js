const User = require('../models/user');

module.exports.profile =async (req,res) =>{
   if(req.cookies.user_id){
        let user = await User.findOne({_id : req.cookies.user_id}).catch(err=>console.log(err));
        if(user){
            return res.render('users_profile',{
                title : "Users Profile",
                user : user
            })
        }}
        return res.redirect('/users/sign-in');
   
}


//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up' ,{
        title : "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
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
module.exports.createSession = async (req,res) => {
    //find the user
    try{
        let user =await User.findOne({email : req.body.email}).catch(err=>console.log(err));
        
    //handle user found
        if(user){
    //handle password that doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
    //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
            res.redirect('back');
        }
    }catch(err){
        console.error(err);
    }
}