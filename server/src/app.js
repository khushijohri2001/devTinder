const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/database");


const app = express();

// CORS middleware
app.use(cors({
  origin: "http://13.60.245.4",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
  credentials: true
}));

// Handle preflight OPTIONS explicitly
app.use(cors({
  origin: "http://13.60.245.4",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth.js")
const profileRouter = require("./router/profile.js");
const userRouter = require("./router/user.js");
const requestRouter = require("./router/request.js")


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", userRouter)
app.use("/", requestRouter)

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
