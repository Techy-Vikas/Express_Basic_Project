const Post = require('../models/post');
const User = require('../models/user')
module.exports.home = async (req, res) => {
    // console.log(req.cookies);
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }
            })

        let users = await User.find({})
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        })
    } catch (err) {
        console.log('err', err);
        return;
    }

}

//methods to write

//using then
//Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();
// posts.then(function());

module.exports.actionName = (req, res) => {
    return res.end('<h1>Action Jackson</h1>')
}
