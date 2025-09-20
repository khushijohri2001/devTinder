const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const { connectDB } = require("./config/database");


const app = express();

const allowedOrigins = ["http://localhost:5173", "http://13.234.75.11", "https://startribe.site", "https://www.startribe.site" ];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// app.options('/api/*', cors(corsOptions));



app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth.js")
const profileRouter = require("./router/profile.js");
const userRouter = require("./router/user.js");
const requestRouter = require("./router/request.js");
const paymentRouter = require("./router/payments.js");

app.get("/test", (req, res) => {
  console.log("hi test here")
  res.send("This is working!")
})
app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", userRouter)
app.use("/", requestRouter)
app.use("/", paymentRouter)

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
