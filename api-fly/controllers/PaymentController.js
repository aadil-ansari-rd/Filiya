const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Food = require('../models/Food');
const stripe = require('stripe')(process.env.STRIPE);
async function doPayment(req, res) {
    try {
        console.log(req.body, 'req.body')
        let { item , user} = req.body;
        if (!item) {
            return res.status(404).send({ message: "Food item not found" });
          }
        let itemm = await Food.findById(item);
        const lineItems = [{
            price_data: {
              currency: 'inr',
              product_data: {
                name: itemm.f_name,
              },
              unit_amount: itemm.f_price * 100
            },
            quantity: 1
          }];
          
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: process.env.PAY_Y,
            cancel_url: process.env.PAY_N
        })
        console.log(session);
        if(session) {
            let transaction = new Transaction({item , user});
            
            transaction.transactionId = session.id
            await transaction.save();
            console.log(transaction._id, '_id')
        }
        res.status(200).send({ data: session.id })
    } catch(err) {
        console.log(err.message, 'msg');
        res.status(500).send({ message: 'Internal server error' });
    }
}
async function updateTransaction(req,res){
    try{
        console.log(req.body)
        let transaction = await Transaction.findOne({transactionId : req.body.transactionId})
        transaction.status = 'Success'
        await transaction.save();
        res.status(200).send({message: "Status has been updated"})
    }catch(err){
        res.status(400).send({message: "Something went wrong"})
    }
}
async function getTransactions(req,res){
    try{
        let transaction = await Transaction.find({})
        res.status(200).send({message:"Success" , data : transaction})

    }catch(err){
        res.status(400).send({message: "Something went wrong"})
    }
}
async function getOrders(req,res){
    try{
        
        let email = req.query.email;
        console.log(email)
        let transaction = await Transaction.find({email : email}).sort('-created_at');
        res.status(200).send({message:"Success" , data : transaction})

    }catch(err){
        res.status(400).send({message: "Something went wrong"})
    }
}


module.exports = {
    doPayment,
    updateTransaction,
    getTransactions,
    getOrders,
   
}