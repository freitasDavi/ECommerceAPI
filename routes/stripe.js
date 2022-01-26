const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_CHAVE;
const stripe = require("stripe")('sk_test_51Jf0qyGkzJpr13DBvM4gu1pgZXzvv7iPah6h16XVPSi5owuWrippvZsDjX19LoQUcTLkGOvZHUxefg0ZRiUVhkvz00cA812qhi');

router.post("/payment", (request, response) => {
    stripe.charges.create({
        source: request.body.tokenId,
        amount: request.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if(stripeErr) {
            return response.status(500).json(stripeErr);
        } else {
            response.status(200).json(stripeRes);
        }
    })
})

module.exports = router;