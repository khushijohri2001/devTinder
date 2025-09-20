const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const razorpayInstance = require("../utils/razorpay.js");
const Payment = require("../models/payments.js");
const { membershipAmount } = require("../utils/constants.js");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils.js");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  const { membershipType } = req.body;
  const { firstName, lastName, email } = req.user;
  try {
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt #1",
      notes: {
        firstName,
        lastName,
        email,
        membershipType: membershipType,
      },
    });

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayments = await payment.save();

    res.json({ ...savedPayments.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }

    //Update my payment status in DB
    const paymentDetails = req.body.payload.payment.entity; //getting updated data
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id }); //getting existing data to update

    payment.status = paymentDetails.status;

    await payment.save();

    const user = await User.findOne({ _id: payment.userId});
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;

    await user.save();

    //Update the user as premium
    // if(req.body.event === payment.captured){
        
    // }
    // if(req.body.event === payment.failed){

    // }

    return res.status(200).son(msg: "Webhook successfully recieved")
  } catch (error) {
    res.status(400).send("Something went wrong" + err);
  }
});

paymentRouter.post("/premium/verify", userAuth, async (req, res) => {
  try {
    const user = req.body;

    if (user.isPremium) {
      return res.json({ isPremium: true });
    }
    return res.json({ isPremium: false });
  } catch (error) {
    res.status(400).send("Something went wrong " + error);
  }
});

module.exports = paymentRouter;
