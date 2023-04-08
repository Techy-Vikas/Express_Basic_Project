const Post = require('../models/post');

module.exports.home =async (req,res) => {
    // console.log(req.cookies);
   Post.find({}).populate('user').then((posts)=>{
    return res.render('home',{
        title : "Codeial | Home",
        posts : posts
    })
   })
}


module.exports.actionName = (req,res) => {
    return res.end('<h1>Action Jackson</h1>')
}