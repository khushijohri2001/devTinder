const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("./models/user");

const { adminAuth } = require("./middleware/auth");
const { connectDB } = require("./config/database");
const { validateSignupData, validateLoginData } = require("./utils/validation");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// POST - Creating new User
app.post("/signup", async (req, res) => {
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

// POST - Login user
app.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;

        // Validating data
        validateLoginData(req)

        const existingUser = await User.findOne({email: email});

        if(!existingUser){
            throw new Error('User not found')
        }
        
        // Checking text password and hash password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
        if(isPasswordValid){
          // generate token
            
            const token = await jwt.sign({_id: existingUser._id}, "DEVTINDER@2001");

            res.cookie("token", token);
            res.send("Login Successful")
        } else{
            throw new Error("Invalid Creds!")
        }
        

    } catch(err){
        res.status(400).send({message: err.message || "Something went wrong"})
    }
})

// GET - Specific User data
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const {token} = cookies;

    if(!token){
      throw new Error("Invalid Token");
    }

    // decode jwt token
    const decodedMessage = await jwt.verify(token, "DEVTINDER@2001");
    
    const {_id} = decodedMessage;

    const user = await User.findById(_id);
    

    if(!user){
      throw new Error("User not found!")
    } else{
      res.send({user: user, message: "User found Successfully"})
    }
    
    

  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// GET - All Users data
app.get('/user', async(req, res) => {
    // const userEmail = req.body.email;

    try{
        const users = await User.find({});

        if(!users){
            res.status(404).send("User not found")
        } else{
            res.send(users, "User found!")
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

//  DELETE - Remove User by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    console.log(user);

    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//  PATCH - Update User data by Id
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const newUserData = req.body;

  try {
    const ALLOWED_ACCESS = ["userId", "firstName", "lastName", "age", "gender"];
    const isUpdateAllowed = Object.keys(newUserData).every((key) =>
      ALLOWED_ACCESS.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Cannot update data. Invalid Field!");
    }

    const user = await User.findByIdAndUpdate(userId, newUserData);
    console.log(user);

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

//  PATCH - Update User data by email
// app.patch("/user", async (req, res) => {
//     const userEmail = req.body.email;
//     const newUserData = req.body;

//     try {

//       const user = await User.updateOne({email: userEmail}, newUserData, {runValidators: true});
//       console.log(user);

//       if (!user) {
//         res.status(404).send("User not found");
//       } else {
//         res.send("User updated successfully!");
//       }
//     } catch (err) {
//       res.status(400).send("Something went wrong "+ err);
//     }
//   });

connectDB()
  .then(() => {
    console.log("Database Connected!");

    app.listen(7777, () => {
      console.log("Listening to port 7777");
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed!");
  });
