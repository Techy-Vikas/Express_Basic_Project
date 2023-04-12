const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req,res) => {
    Post.findById(req.body.post).then((post)=>{
        // console.log(post,req.body.content,req.body.post,req.user._id)
      Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }).then((comment)=>{
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }).catch(err=>console.error(err))
        
    }).catch(err=>console.error(err))
}

module.exports.destroy = (req,res) => {
    Comment.findById({req.params.id}).then(comment=>{
        if(comment.user == req.user.id){
            
        }
    }).catch(err=>{console.log(err);})
}