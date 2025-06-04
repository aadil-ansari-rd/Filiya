const express = require('express');
const paymentcontroller = require('../controllers/PaymentController');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
 

router.post('/create-checkout-session', (req, res) => {
    console.log("payment route")
    paymentcontroller.doPayment(req, res);

})
router.put('/update/transaction', (req, res) => {
    console.log("update upayment route")
    paymentcontroller.updateTransaction(req, res);
})

router.get('/transactions', (req, res) => {
    paymentcontroller.getTransactions(req, res)
})


router.get('/orders', (req, res) => {
    console.log('route me aa gaya')
    paymentcontroller.getOrders(req, res);
})

router.post('/review' , (req,res)=>{
    paymentcontroller.submitReview(req,res);
})
module.exports = router;