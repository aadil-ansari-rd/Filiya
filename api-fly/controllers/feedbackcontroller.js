const Feedback = require("../models/Feedback");

async function addFeedback(req, res) {
    try {
        let feedback = new Feedback(req.body);
        await feedback.save();
        res.status(200).send({ success: true, message: 'Data sent sucessfully' });
    } catch (err) {
        console.log(err)
        res.status(400).send({ success: false, message: 'Somthing went wrong' });

    }
}

async function getFeedbacks(req,res){
    try{
        let feedbacks= await Feedback.find({}).populate("user");
        res.status(200).send({success: true , data:feedbacks});

    }catch(err){
        console.log(err);
        res.status(400).send({success: false });

    }
}

async function deleteFeedback(req,res){
    try{
        let id = req.params.id;
        await Feedback.deleteOne({ _id: id })
        res.status(200).send({ success: true })

    }catch(err){
        console.log(err.message);
        res.status(400).send({success: false });

    }
}

module.exports = {
    addFeedback,
    getFeedbacks,
    deleteFeedback
}