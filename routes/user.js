const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, async (request, response) => {
     if(request.body.password) {
         request.body.password = CryptoJS.AES.encrypt(
             request.body.password,
             process.env.PASS_SEC
         ).toString()
     }

     try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set: request.body
        }, {
            new: true
        })

        response.status(200).json(updatedUser);
     } catch (err) {
        response.status(500).json(err);
     }
});

module.exports = router;