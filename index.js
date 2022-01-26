const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoutes = require("./routes/order");
const stripeRoute = require("./routes/stripe");

dontenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connection Successfull"))
.catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend server running at ${process.env.PORT}`)
});