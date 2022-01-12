const router = require("express").Router();
const Order = require("../models/Order");
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require("./verifyToken");

//Create

router.post("/", verifyToken, async( request, response) => {
    const newOrder = new Order(request.body);

    try {
        const savedOrder = await newOrder.save();

        response.status(200).json(savedOrder);

    } catch (err) {
        response.status(500).json(err);
    }
});

// Update cart
router.put("/:id", verifyTokenAndAdmin, async(request, response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            request.params.id,
            {
                $set: request.body,
            },
            { new: true }
        );

        response.status(200).json(updatedOrder);
    } catch (err) {
        response.status(500).json(err);
    }
});

// Delete products
router.delete("/:id", verifyTokenAndAdmin, async (request, response) => {
    try { 
        await Order.findByIdAndDelete(request.params.id);

        response.status(200).json("Order has been deleted!");

    } catch (err) {
        response.status(500).json(err);
    }
});

// Get user orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (request, response) => {
    try {
        const orders = await Order.findOne({
            userId: request.params.userId
        }); 

        response.status(200).json(orders);

    } catch (err) {
        response.status(500).json(err);
    }
})


// Get all 
router.get("/", verifyTokenAndAdmin, async (request, response) => {
    try {
        const orders = await Order.find();

        response.status(200).json(orders);
    } catch (err) {
        response.status(500).json(err);
    }
});

// Get monthly income
router.get("/income", verifyTokenAndAdmin, async (request, response) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt"},
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ])

        console.log("?")
        response.status(200).json(income);
        
    } catch (err) {
        response.status(500).json(err);
    }
})

module.exports = router;