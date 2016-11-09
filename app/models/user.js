var mongoose= require('mongoose');
var schema= mongoose.Schema; // Reference to Schema

// Making Schema
var message= new schema({
    from: String,
    to: String,
    chats: [{
            date: Date,
            message: String
        }]
    });
var userSchema= new schema({
    name: String,
    uname: String,
    password: String,
    friends: [],
    message: [message] 
});

//exporting model for the file that is requesting for Data
module.exports=mongoose.model('chats', userSchema);