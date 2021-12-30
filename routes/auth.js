const router = require("express").Router();
const User = require("../models/User");

// Register
router.post("/register", async (request, response) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await newUser.save();
        
        response.status(200).json(savedUser);
    } catch (err) {
        response.status(500).json(err);
        console.log(err);
    }
    
})

module.exports = router;