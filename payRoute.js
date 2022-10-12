const express = require("express");

const payController = require("./payController");

const router = express.Router();

router.post("/payment", payController.pay);

router.get("/success", payController.success);

router.get("/cancel", payController.cancel);

router.get("/failed", payController.failed);

router.post("/dummy", payController.dummy);

module.exports = router;

/* => json body
    {
        "currency": "NPR",
        "amount": 1,
        "transaction_code": "glkjhkghk",
        "description": "dftghdf"
    }

*/
