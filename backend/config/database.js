const mongoose = require('mongoose');

const connectMongoose = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(res => {
        console.log('Connected to MongoDB Database');
    })
};

module.exports = connectMongoose;
