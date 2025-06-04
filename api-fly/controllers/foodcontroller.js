const Food = require('../models/Food')
const cloudinary = require('cloudinary');
async function addFood(req, res) {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDNAME ,
            api_key: process.env.APIKEY ,
            api_secret: process.env.APISECRET
        })
        let food = new Food(req.body);

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            food.f_image = result.secure_url;
        }
        await food.save();
        let foods = await Food.find({});
        res.status(200).send({ success: true, message: 'Data sent sucessfully', foods: foods });
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ success: false, message: 'something went wrong ... ' });
    }
}
async function getFoods(req, res) {
    try {
        //console.log(req.query, 'req.query')  //req.query is used  mainly for search bar
        let pageNo = parseInt(req.query.pageNo)
        let limit = parseInt(req.query.limit)
        let sk = (pageNo - 1) * limit;
        let totalCounts = await Food.countDocuments({})
        let foods = await Food.find({ f_name: new RegExp(req.query.search, "i") }).skip(sk).limit(limit)
        res.status(200).send({ success: true, data: foods, totalCounts: totalCounts });
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false });
    }
}
async function getFoodsFor(req, res) {
    try {
        
        let foods = await Food.find({})
        console.log(foods)
        res.status(200).send({ success: true, data: foods });
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false });
    }
}
async function getFood(req, res) {
    try {
        let id = req.params.id;
        let food = await Food.findOne({ _id: id })
        res.status(200).send({ success: true, data: food });
    } catch (err) {
        console.log(err);
        res.status(200).send({ success: false });
    }
}
async function editFood(req, res) {
    try {
        console.log(req.file)
        let id = req.params.id;
        let food = await Food.findOne({ _id: id })
        cloudinary.config({
            cloud_name: process.env.CLOUDNAME ,
            api_key: process.env.APIKEY ,
            api_secret: process.env.APISECRET
        })
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            food.f_image = result.secure_url;
        }
        food.f_name = req.body.f_name;
        food.f_description = req.body.f_description;
        food.f_price = req.body.f_price;
        food.f_category = req.body.f_category;
        food.f_availability = req.body.f_availability;
        food.f_rating = req.body.f_rating;
        
        await food.save();
        res.status(200).send({ success: true });

    } catch (err) {
        console.log(err)
        res.status(400).send({ success: false });
    }
}
async function deleteFood(req, res) {
    try {
        let id = req.params.id;
        await Food.deleteOne({ _id: id })
        let foods = await Food.find({});
        res.status(200).send({ success: true, data: foods })
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false });
    }
}
module.exports = {
    addFood,
    getFoods,
    getFood,
    editFood,
    deleteFood,
    getFoodsFor
}