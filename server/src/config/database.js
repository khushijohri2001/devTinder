const mongoose = require('mongoose');

const connectDB = async() => {
        // await mongoose.connect("mongodb://localhost:27017/devTinderDB");
        await mongoose.connect(process.env.DB_CONNECTION_SECRET, {
            family: 4
        });
        
}

module.exports = {connectDB}