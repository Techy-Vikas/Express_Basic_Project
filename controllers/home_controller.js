module.exports.home = function(req,res){
    // console.log(req.cookies);
    res.cookie('user_id',25)
    return res.render('home.ejs',{
        title : "Home"
    });
}

module.exports.actionName = (req,res) => {
    return res.end('<h1>Action Jackson</h1>')
}