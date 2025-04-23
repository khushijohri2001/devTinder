const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type: String
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Invalid Gender")
            }
        }
    },
}, {timestamps: true})

const User = new mongoose.model('User', userSchema);

module.exports = User