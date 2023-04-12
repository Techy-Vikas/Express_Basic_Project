const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = async (req,res) => {
    Post.findById(req.params.id).then(post=>{
        //.id means converting the object id into string
        console.log(post)
        if(post.user == req.user.id){
           Post.deleteOne(post).then(data=>{
            Comment.deleteMany({post : req.params.id}).then(err=>{
                return res.redirect('back');
           });
            })
        }
        else{
            return res.redirect('back');
        }
    })
}