module.exports.home = function(req,res){
    return res.end('<h1>Express is up for Codial</h1>')
}

module.exports.actionName = (req,res) => {
    return res.end('<h1>Action Jackson</h1>')
}