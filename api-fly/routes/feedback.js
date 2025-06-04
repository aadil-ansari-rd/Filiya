const express = require('express');
const router = express.Router();
const multer = require('multer');
const feedbackcontroller = require("../controllers/feedbackcontroller");
const bodyParser = require('body-parser');
const { isLoggedin } = require('../middleware');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended : false
}));
const uploader = multer({
    storage:multer.diskStorage({}),
    limits: { fileSize: 10 * 1024 * 1024},
});


router.post("/add/feedback" ,isLoggedin, (req,res)=>{
    feedbackcontroller.addFeedback(req,res);
})

router.get("/get/feedbacks", (req,res)=>{
    feedbackcontroller.getFeedbacks(req,res);
})

router.delete("/delete/feedback/:id", (req,res)=>{
    feedbackcontroller.deleteFeedback(req,res);
})

module.exports= router