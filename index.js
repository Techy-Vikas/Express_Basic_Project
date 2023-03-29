const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'))

//we need to put it before routes
app.use(expressLayouts);

//use express router
app.use('/',require('./routes/index'))


//setup the view engine
app.set('view engine','ejs')
app.set('views','./views')

app.listen(port,(err)=>{
    if(err){
        console.error(`Error in server ${err}`)
        return
    }
    console.log(`Server is running on Port : ${port}`)
})