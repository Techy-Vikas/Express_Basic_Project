const Comment = require("../../../models/comment")
const Post = require("../../../models/post")

module.exports.index = async (req,res) => {

    let posts = await Post.find({}).sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }
            })

    return res.status(200).json({
        message : 'Lists of Posts',
        posts: posts
    })
}

module.exports.destroy = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)

        if (post.user == req.user.id) {
            // post.remove();
            await Post.deleteOne(post)
            await Comment.deleteMany({ post: req.params.id });
            // if(req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post Deleted"
            //     })
            // }
            // return res.redirect('back');
            return res.status(200).json({
                message : "Post and Associated Comments Deleted Successfully!"
            })

        }
        else {
            return res.status(401).json({
                message: 'You cannot delete this post'
            })
        }
    } catch (err) {
        console.log('err', err);
        res.status(500).json({
            message : 'Internal Server Error',
        })

    }

}