//Packages thet we need in our application
var express = require('express'); //For routing
var app= express();

var http= require('http').Server(app); // Passing app to create Server
var io=require('socket.io')(http); // Passing http to socket.io to mentain connection
var mongoose= require('mongoose'); // For MongoDB Database
var bodyParser=require('body-parser'); // To parse the data from http body
var session=require('express-session'); // For sessions


// Calling files
var routs= require('./app/routs')(app); // For routs(API) 
var configDb=require('./config/database'); // Database URL
var userModel=require('./app/models/user'); // For schema

//Mongoose connection
mongoose.connect(configDb.url);

//engine for templating
app.set('engine', 'ejs');

// Make the files in the public folder available
app.use(express.static(__dirname));
app.use(session({secret: 'asecret'})); //Giving a secret to mentain session
app.use(bodyParser());


// It runs when any user connects for chat and make a separate room for one to one chating
io.on('connection', function(socket) {
    socket.on('join', function (data) {
    console.log(data.uname);
    var rooms= io.sockets.adapter.rooms;
    socket.join(data.uname); // We are using room of socket io and making a room
    

// Just consoling the rooms to test our app is working.
    if (rooms) {
        for (var room in rooms) {
            if (!rooms[room].hasOwnProperty(room)) {
                console.log("Room: "+room);
            }
        }
    }
//Note: Prince, delete it in production


    });
    socket.on('chat message', function(data){
        io.to(data.uname).emit('new_msg', {msg: data.msg, uname: data.uname});
        console.log(data.uname +" : "+data.msg);
    });

//Run when user disconnects
    socket.on('disconnect', function() {
        var rooms = io.sockets.adapter.rooms;
    
    // Prince delete this also
    if (rooms) {
        for (var room in rooms) {
            if (!rooms[room].hasOwnProperty(room)) {
                console.log("Room: "+room);
            }
        }
    }

    });
});

http.listen(3000); //run it on a port