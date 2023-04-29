const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//sign in and create a session for the user
module.exports.createSession = async (req,res) => {
    try{
    let user = await User.findOne({email : req.body.email});
    if(!user || user.password != req.body.password){
        return res.status(422).json({
            message : "Invalid UserName or password"
        })
    }

    return res.status(200).json({
        message : 'Sign in successfully, here is your token, please keep it safe!',
        data: {
            token : jwt.sign(user.toJSON(),'codeial',{expiresIn : '1000000'}),
        }
    })
    }catch(err){
        console.log('error',err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}