const express = require('express');
const router = express.Router();
const foodcontroller = require('../controllers/foodcontroller');
const multer = require('multer');
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

router.post('/add/food',  uploader.single("f_image"), (req,res)=>{
    foodcontroller.addFood(req,res);
})
router.get('/foods',(req,res)=>{
    foodcontroller.getFoods(req,res);
})
router.get('/foods/for',(req,res)=>{
    foodcontroller.getFoodsFor(req,res);
})
router.get('/food/:id',(req,res)=>{
    foodcontroller.getFood(req,res)
})
router.put('/edit/food/:id',uploader.single("file") ,(req,res)=>{
    foodcontroller.editFood(req,res)
})
router.delete('/delete/food/:id',(req,res)=>{
    foodcontroller.deleteFood(req,res)
})
module.exports = router;