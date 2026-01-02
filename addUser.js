const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/addinguser');

const addUser = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    confirm_password : String
})

module.exports = mongoose.model('addUser_', addUser);