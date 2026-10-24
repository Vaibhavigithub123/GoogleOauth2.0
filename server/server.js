const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const passport = require("passport");

const app = express();
dotenv.config();

//passport config
require("./config/stratergies/passport");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(
  cors({
    origin: process.env.UI_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

//authroute

app.use("/auth", authRoute);

app.get("/abc", (req, res) => {
  res.send("Backend is working!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
