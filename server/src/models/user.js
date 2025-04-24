const mongoose = require("mongoose");
const validator = require("validator");

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
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid password: " + value)
            }
        }
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