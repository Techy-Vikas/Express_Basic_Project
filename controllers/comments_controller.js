const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req, res) => {
    try {
        let post = await Post.findById(req.body.post)
        // console.log(post,req.body.content,req.body.post,req.user._id)
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        post.comments.push(comment);
        post.save();
        res.redirect('/');
    }
    catch (err) {
        console.log('err', err);
    }
}

module.exports.destroy = (req, res) => {
    console.log(req.params.id);
    Comment.findById(req.params.id).then(comment => {
        console.log(comment)
        if (comment.user == req.user.id) {
            let postId = comment.post;
            // comment.remove();
            Comment.deleteOne(comment).then(data => {
                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).then(post => {
                    res.redirect('back');
                }).catch(err => { console.log(err) });
            }).catch(err => { console.log(err); })

        }
        else {
            return res.redirect('back');
        }
    }).catch(err => { console.log(err); })
}