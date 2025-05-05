const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
    const token = "abcdefghijk";
    const isAdminAuthorized = token === token;

    if(!isAdminAuthorized){
        res.status(401).send("Unathorized Request");
    } else{
        next()
    }
}

const userAuth = async (req, res, next) => {
    try{
        //Read cookies and get token
    const {token} = req.cookies;

    if(!token){
        res.status(401).send("Please Login");
    }

    //Decrypt token
    const decodedMessage = await jwt.verify(token, "DEVTINDER@2001");

    const {_id} = decodedMessage;

    //Get the user data
    const user = await User.findById(_id);

    if(!user){
        throw new Error("User does not Exist!")
    }

    req.user = user;
    next();
    } catch(err){
        res.status(400).send({ message: err.message || "Something went wrong" });
    }
}

module.exports = {adminAuth, userAuth}