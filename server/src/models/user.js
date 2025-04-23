const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    gender: {
        type: String
    },
})

const User = new mongoose.model('User', userSchema);

module.exports = User