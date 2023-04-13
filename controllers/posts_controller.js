const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.post = (req,res)=>{
//     res.send("post controller")
// }

module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        })
        return res.redirect('back');
    } catch (err) {
        console.log('err', err);
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)

        if (post.user == req.user.id) {
            // post.remove();
            await Post.deleteOne(post)
            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');

        }
        else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('err', err);
    }

}