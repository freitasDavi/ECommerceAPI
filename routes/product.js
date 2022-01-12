const router = require("express").Router();
const Product = require("../models/Product");
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require("./verifyToken");

//Create

router.post("/", verifyTokenAndAdmin, async( request, response) => {
    const newProduct = new Product(request.body);

    try {
        const savedProduct = await newProduct.save();

        response.status(200).json(savedProduct);

    } catch (err) {
        response.status(500).json(err);
    }
});

// Update products
router.put("/:id", verifyTokenAndAdmin, async(request, response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            request.params.id,
            {
                $set: request.body,
            },
            { new: true }
        );

        response.status(200).json(updatedProduct);
    } catch (err) {
        response.status(500).json(err);
    }
});

// Delete products
router.delete("/:id", verifyTokenAndAdmin, async (request, response) => {
    try { 
        await Product.findByIdAndDelete(request.params.id);

        response.status(200).json("Product ahas been deleted!");

    } catch (err) {
        response.status(500).json(err);
    }
});

// Get product
router.get("/find/:id", async (request, response) => {
    try {
        const product = await Product.findById(request.params.id); 

        response.status(200).json(product);

    } catch (err) {
        response.status(500).json(err);
    }
})


// Get all products 
router.get("/", async (request, response) => {
    const queryNew = request.query.new;
    const queryCategory = request.query.category;

    try {
        let products;

        if(queryNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1)
        } else if (queryCategory) {
            products = await Product.find({ categories: {
                $in: [queryCategory],
            },
         });
        } else {
            products = await Product.find();   
        }

        response.status(200).json(products);

    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;