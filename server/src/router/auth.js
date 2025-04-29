const express = require('express');
const authRouter = express.Router();
const { validateSignupData, validateLoginData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// POST /signup - Creating new User
authRouter.post("/signup", async (req, res) => {
    try {
      //Validation
      validateSignupData(req);
  
      //Encryption
      const { firstName, lastName, email, password, age, gender } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age,
        gender,
      });
  
      await user.save();
      res.send("User created!");
    } catch (err) {
      res.status(400).send({ message: err.message || "Something went wrong" });
    }
  });

  // POST /login - Login user
  authRouter.post('/login', async(req, res) => {
      try{
          const {email, password} = req.body;
  
          // Validating data
          validateLoginData(req)
  
          const existingUser = await User.findOne({email: email});
  
          if(!existingUser){
              throw new Error('User not found')
          }
          
          // Checking text password and hash password
          const isPasswordValid = await existingUser.passwordValidation(password);
          
          if(isPasswordValid){
            // generate token
              const token = await existingUser.getJWT()
  
              res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
  
              res.send("Login Successful");
          
          } else{
              throw new Error("Invalid Creds!")
          }
  
      } catch(err){
          res.status(400).send({ message: err.message || "Something went wrong" })
      }
  })


   // POST /logout - Logout user
   authRouter.post('/logout', async(req, res) => {
    res.cookie("token", null, { expires : new Date(Date.now())});

    res.send("Logout successful")
})

  module.exports = authRouter