const User = require("../models/User");
const cloudinary = require("cloudinary");

async function addUser(req, res) {

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.APIKEY,
      api_secret: process.env.APISECRET
    })
    console.log(req.body);


    let user = new User(req.body);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      user.u_image = result.secure_url;
    }
    await User.register(user, req.body.password);
    res.status(200).send({ success: true, message: 'User added' });
    // let user = await User.findOne({ email: req.body.email });
    // if (user) {
    //   res.status(400).send({ success: false, message: "User already exist" });
    // } else {
    //   user = new User(req.body);
    //   await user.save();
    //   res.status(200).send({ success: true });
    // }
    // console.log(req.body);
    // let user = new User(req.body);
    // await user.save();
    // res.status(200).send({ success: true });
  } catch (err) {
    res.status(400).send({ success: false });
    console.log(err.message);
  }
}
async function getUsers(req, res) {
  try {

    let pageNo = parseInt(req.query.pageNo);
    let limit = parseInt(req.query.limit);
    let sk = (pageNo - 1) * limit;
    let totalCounts = await User.countDocuments({});
    let users = await User.find({
      firstName: new RegExp(req.query.search, "i"),
    })
      .skip(sk)
      .limit(limit);
    res
      .status(200)
      .send({ success: true, data: users, totalCounts: totalCounts });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false });
  }
}
const login = async (req, res) => {
  try {
    res
      .status(200)
      .send({ success: true, message: "You are logged in" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false });
  }
}
const logout = (req, res) => { //This function should not be in wrapAsync
  console.log("Logout fn")
  try {
    req.logout((err) => {
      if (err) {
        res.status(400).send({ success: false });
      }
      res
        .status(200)
        .send({ success: true, message: "Yyou are logged out" });

    })

  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false });
  }

}

module.exports = {
  addUser,
  getUsers,
  login,
  logout
};