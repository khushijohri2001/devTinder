const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const { connectDB } = require("./config/database");


const app = express();

// CORS middleware
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
//   credentials: true
// }));

// // Handle preflight OPTIONS explicitly
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   credentials: true
// }));
// CORS middleware
app.use(cors({
  origin: "http://13.234.75.11",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
  credentials: true
}));

// Handle preflight OPTIONS explicitly
app.use(cors({
  origin: "http://13.234.75.11",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth.js")
const profileRouter = require("./router/profile.js");
const userRouter = require("./router/user.js");
const requestRouter = require("./router/request.js")

app.get("/test", (req, res) => {
  res.send("This is working")
})
app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", userRouter)
app.use("/", requestRouter)

connectDB()
  .then(() => {
    console.log("Database Connected!");

    app.listen(process.env.PORT, () => {
      console.log("Listening to port 7777");
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed!");
  });
