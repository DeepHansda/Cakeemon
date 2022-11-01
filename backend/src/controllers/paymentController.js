const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require('../services/errorHandler')
const Razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');

module.exports= { 
    paymentProcess:catchAsyncErrors(async (req, res, next) => {
    const {amount}  = req.body;
    const paymentInstance = new Razorpay({key_id:process.env.KEY_ID,key_secret:process.env.KEY_SECRET})

    const options = {
        amount:amount*100,
        currency:"INR",
        receipt: `order_${shortid.generate()}`,
    }
    await paymentInstance.orders.create(options,(err,response)=>{
        if(err){
            console.log(err)
            return next(new ErrorHandler(err.message,401))
        }

        res.status(200).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
          });
    })
}),

paymentVerify:catchAsyncErrors(async (req, res, next) => {
    const {razorpay_order_id,razorpay_payment_id}= req.body;
    const razorpay_signature = req.headers['x-razorpay-signature'];
 // Verification & Send Response to User

  // Creating hmac object 
    const hmac = crypto.createHmac('sha256',process.env.KEY_SECRET);
     // Passing the data to be hashed
     hmac.update(razorpay_order_id+ "|" +razorpay_payment_id)
     // Creating the hmac in the required format
     const generated_signature = hmac.digest('hex');

     if(generated_signature==razorpay_signature){
        res.status(200).json({success:1,message:'Payment has been varified',razorpay_order_id,razorpay_payment_id})
     }
     else{
        next(new ErrorHandler('Payment Verification faild!', 401))
     }
})
}