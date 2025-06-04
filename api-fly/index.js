if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require('express');
const connect = require('./connection');
const cors = require('cors')
const food = require('./routes/food')
const user = require('./routes/user')
const payment = require('./routes/payment')
const feedback = require('./routes/feedback')
const app = express();
connect();

// -------------


const path = require('path');
const ejsmate = require('ejs-mate');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsmate);


app.get('/',(req,res)=>{
    try{
        console.log("home")
        // res.send("all ser")
        res.render('main.ejs')
    }catch(err){
        console.log(err.message)
    }
})

// -------------

const allowedOrigins = [process.env.ADMIN_IP, process.env.USER_IP]; // Add your origins here

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


//
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require('passport-local');
const User = require("./models/User.js");
const { render } = require("ejs");


const store = MongoStore.create({
    mongoUrl : process.env.MONGOURL,
    crypto : {
        secret :  process.env.F_SECRETE,
    },
    touchAfter : 24*3600, //in seconds
})

store.on("error",()=>{
    console.log("Error in mongo store ", err)
})


const sessionOption = {
    store,
    secret : process.env.F_SECRETE,
    resave : false,
    saveUninitialized : true,

    cookie :{
        expires : Date.now() + 7 *24 * 60*60*1000,
        maxAge : 7 *24 * 60*60*1000,
        httpOnly : true
    }
}



// session middleware
app.use(session(sessionOption));

// flash middleware

// passport init
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


//



app.use(food);
app.use(user);
app.use(feedback);
app.use(payment);




app.listen(3000,'0.0.0.0', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Your Server is running on port 3000');       
    }
})