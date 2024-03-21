const mongoose = require("mongoose");

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }).then(() => { console.log("DB connecton successfull") })
        .catch((error) => {
            console.log("DB connection issue!!!");
            console.log(error);
            process.exit(1);
        })
}