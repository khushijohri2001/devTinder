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
       return res.status(401).send("Please Login");
    }

    //Decrypt token
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);

    const {_id} = decodedMessage;

    //Get the user data
    const user = await User.findById(_id);

    if(!user){
        return res.status(404).send("User does not exist");
    }

    req.user = user;
    next();
    } catch(err){
       console.error("Auth Error:", err.message);

    // Send error only if response not already sent
    if (!res.headersSent) {
      res.status(401).send({ message: err.message || "Unauthorized" });
    }
    }
}

module.exports = {adminAuth, userAuth}