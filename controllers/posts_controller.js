const Post = require('../models/post');

// module.exports.post = (req,res)=>{
//     res.send("post controller")
// }

module.exports.create = async (req,res) => {
    let post = await Post.create({
        content : req.body.content,
        user : req.user._id,
    }).catch(err=>console.error(err));

    if(post){
        return res.redirect('back');
    }
}