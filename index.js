const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const userRoute = require("./routes/user");

dontenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connection Successfull"))
.catch((err) => {
    console.log(err);
});

app.use(express.json());

app.use("/api/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend server running at ${process.env.PORT}`)
});