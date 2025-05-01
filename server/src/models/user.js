const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is incorrect status type`
        }
    },
    about: {
        type: String,
    },
    skills: {
        type: [String],
    },
    photoUrl: {
        type: String
    }
}, {timestamps: true});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEVTINDER@2001", {expiresIn: "1d"});

    return token;
}

userSchema.methods.passwordValidation = async function(passwordInput){
    const user = this;
    const hashedPassword = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInput, hashedPassword);

    return isPasswordValid;
}

const User = new mongoose.model('User', userSchema);

module.exports = User