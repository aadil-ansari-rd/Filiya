const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');
const multer = require('multer');
const passport = require('passport');
const randomstring = require("randomstring");//For otp generation
const nodemailer = require("nodemailer"); //for otp sending
const bodyParser = require('body-parser');
const User = require('../models/User');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 10 * 1024 * 1024 },
});


//--------------------------------------------------------------------------------------------------


//OTP

//Store genrate opt
const otpCatch = {};

//Generate otp
function generateOTP() {
    return randomstring.generate({ length: 4, charset: "numeric" })
}

//Snd OTP via email 

function sendOtp(email, otp) {
    const mailOption = {
        from: process.env.FROMEMAIL,
        to: email,
        subject: "OTP Verification",
        text: `Your OTP for verification is : ${otp}`
    };
    
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.FROMEMAIL,
            pass: process.env.APP_PASSKEY,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log("Error occured : ", error);

        } else {
            console.log('OTP Email sent successfully.', info.response)
        }
    })
}

//Request Otp

router.post('/emailver', async (req, res, next) => {
    try {


        let { email } = req.body;
        let user = await User.findOne({ email: email });
        if (user) {
            res.status(400).send({ success: false, message: "Already" })
        }
        const otp = generateOTP();
        otpCatch[email] = otp;
        sendOtp(email, otp);
        res.status(200).send({ success: true })

    } catch (err) {
        console.log(err.message)
        res.status(400).send({ success: false, message: "Error" })
    }


});


//Verify Otp

router.post('/otpver', (req, res)=>{
    try {
        const { email, otp } = req.body;

        //if email does not exist in otpCatch
        if (!otpCatch.hasOwnProperty(email)) {
            res.status(400).send({ success: false, message: "notExist" })
        }

        //if otp matches the one in the otpCatch

        if (otpCatch[email] === otp.trim()) {
            res.status(200).send({ success: true, message: "verified" })
        } else {
            res.status(400).send({ success: false, message: "notMatched" })
        }

    } catch (err) {
        console.log(err.message);
        res.status(400).send({ success: false, message: "Error" })
    }
})



//--------------------------------------------------------------------------------------------------

router.post('/add/user', uploader.single("u_image"), (req, res) => {
    let email = req.body.u_email ;
    if (!otpCatch.hasOwnProperty(email)) {
        res.status(400).send({ success: false, message: "notExist" })
    }
    delete otpCatch[email];
    console.log(otpCatch);
    usercontroller.addUser(req, res);
})
router.get('/users', (req, res) => {
    usercontroller.getUsers(req, res);
})

// routes/user.js


router.post('/login', (req, res, next) => {
    console.log("login route")
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        if (user.u_role !== "user") {
            return res.status(403).send({ success: false, message: "You are not authorized for this" });
        }


        req.logIn(user, (err) => {
            if (err) return next(err);
            console.log("Logged in:", req.user);
            res.status(200).send({ success: true, message: "You are logged in", user: req.user });
            // res.status(200).json({ success: true, message: "You are logged in" });
        });
    })(req, res, next);
});

router.post('/login/admin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        if (user.u_role !== "admin") {
            return res.status(403).send({ success: false, message: "You are not authorized for this" });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.status(200).send({ success: true, message: "You are logged in", user });
        });
    })(req, res, next);
});


router.get('/logout/user', (req, res) => {
    console.log("fn lt")
    req.logout((err) => {
        if (err) {
            res.status(400).send({ success: false });
        }
        console.log("dn lt")

        res
            .status(200)
            .send({ success: true, message: "You are logged out" });

    })
});
router.get('/logout/admin', (req, res) => {
    console.log("fn lt")
    req.logout((err) => {
        if (err) {
            res.status(400).send({ success: false });
        }
        console.log("dn lt")

        res
            .status(200)
            .send({ success: true, message: "You are logged out" });

    })
});


router.get('/profile', (req, res) => {
    try {
        if (req.isAuthenticated()) {
            console.log("pass")
            res.status(200).send({ success: true });
        } else {
            return res.status(401).send({ success: false, message: "Unauthorized" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: "Server error" });


    }
});
router.get('/profile/admin', (req, res) => {
    try {
        let role = req.user.u_role;
        if(role!=="admin"){
            return res.status(401).send({ success: false, message: "Unauthorized" });

        }
        if (req.isAuthenticated()) {
            console.log("pass")
            res.status(200).send({ success: true });
        } else {
            return res.status(401).send({ success: false, message: "Unauthorized" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send({ success: false, message: "Server error" });


    }
});


module.exports = router;



