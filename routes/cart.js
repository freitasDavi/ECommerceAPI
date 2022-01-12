const router = require("express").Router();
const Cart = require("../models/Cart");
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require("./verifyToken");

//Create

router.post("/", verifyToken, async( request, response) => {
    const newCart = new Cart(request.body);

    try {
        const savedCart = await newCart.save();

        response.status(200).json(savedCart);

    } catch (err) {
        response.status(500).json(err);
    }
});

// Update cart
router.put("/:id", verifyTokenAndAuthorization, async(request, response) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            request.params.id,
            {
                $set: request.body,
            },
            { new: true }
        );

        response.status(200).json(updatedCart);
    } catch (err) {
        response.status(500).json(err);
    }
});

// Delete products
router.delete("/:id", verifyTokenAndAuthorization, async (request, response) => {
    try { 
        await Cart.findByIdAndDelete(request.params.id);

        response.status(200).json("Product ahas been deleted!");

    } catch (err) {
        response.status(500).json(err);
    }
});

// Get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (request, response) => {
    try {
        const cart = await Cart.findOne({
            userId: request.params.userId
        }); 

        response.status(200).json(cart);

    } catch (err) {
        response.status(500).json(err);
    }
})


// Get all 
router.get("/", verifyTokenAndAdmin, async (request, response) => {
    try {
        const carts = await Cart.find();

        response.status(200).json(carts);
    } catch (err) {
        response.status(500).json(err);
    }
})

module.exports = router;