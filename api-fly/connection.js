const mongoose = require('mongoose');

async function connect() {
    let url = process.env.MONGOURL;
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected to Filiya');
    } catch (err) {
        console.log(err.message);

    }
}
module.exports = connect; 