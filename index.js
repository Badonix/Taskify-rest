require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");

// express app
const app = express();
app.use(cors());
// middleware
app.use(express.json());

app.use((req, res, next) => {
  next();
});

// routes
app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

// connect to db
let urlWithUsername = process.env.MONGO_URI.replace(
  "<username>",
  process.env.MONGO_USERNAME,
);
let MONGO_URI = urlWithUsername.replace(
  "<password>",
  process.env.MONGO_PASSWORD,
);
console.log(MONGO_URI);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
