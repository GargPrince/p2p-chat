var userModel=require('./models/user'); // For Schema
var bodyParser=require('body-parser'); // Extract json in http body
var path = require('path');
var session=require('express-session');
module.exports=function(app) {
app.use(bodyParser()); //get/parses the information from http body
app.use(session({secret: 'asecret'})); // assign secret to manage session variable

// Our first page
app.get('/', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {message: ('Login Message!!!')});
    });


//Post from Login page to login
app.post('/login', function(req, res) {
    userModel.findOne({uname: req.body.uname, password: req.body.password}, function(err, user) {
        if(err) console.log(err.toString());
        else if(user) {
            var sess= req.session; // assign session variable by request variable 
            sess.user=user; //use 'sess' variable just like php $_SESSION['user'] variable
            res.render('friends.ejs', {friends: (user.friends), uname: req.body.uname});
            console.log(user.friends);
            //res.sendFile(path.resolve(__dirname+'/../views/index.html'));
        }
        else res.render('login.ejs', {message: 'Please login with correct cridentials'});

    });
});

//Post data from signup and saving in mongo DB
app.post('/signup', function(req, res) {
    var user=userModel({
        name: req.body.name,
        uname: req.body.uname,
        password: req.body.password,
        friends: req.body.friends
    });
    
    user.save(function(err, data) {
        if(err) console.log(err.toString());
        console.log(data);
    });
});

//For chatting from friend
app.post('/chat', function(req, res) {
    res.render('chat.ejs', {friend: req.body.friend, uname: req.session.user.uname});
});

};