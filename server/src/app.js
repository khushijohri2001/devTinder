const express = require("express");

const cors = require("cors");

const { adminAuth } = require("./middleware/auth");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());

// POST - Creating new User
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created!");
  } catch (err) {
    res.status(400).send("Error while saving the user!", err);
  }
});

// GET - Specific User data
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user, "User found!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// GET - All Users data
// app.get('/user', async(req, res) => {
//     // const userEmail = req.body.email;

//     try{
//         const users = await User.find({});

//         if(!users){
//             res.status(404).send("User not found")
//         } else{
//             res.send(users, "User found!")
//         }
//     }catch(err){
//         res.status(400).send("Something went wrong")
//     }
// })

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
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const newUserData = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(userId, newUserData);
//     console.log(user);

//     if (!user) {
//       res.status(404).send("User not found");
//     } else {
//       res.send("User updated successfully!");
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });


//  PATCH - Update User data by email
app.patch("/user", async (req, res) => {
    const userEmail = req.body.email;
    const newUserData = req.body;
  
    try {
      const user = await User.updateOne({email: userEmail}, newUserData, {runValidators: true});
      console.log(user);
  
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.send("User updated successfully!");
      }
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  });

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
