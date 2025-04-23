const mongoose = require('mongoose');

const connectDB = async() => {
        // await mongoose.connect("mongodb://localhost:27017/devTinderDB");
        await mongoose.connect("mongodb+srv://khushijohri2001:TLmGftvXeqo95gm4@namastenodejs.fyj3cho.mongodb.net/devTinderDB?retryWrites=true&w=majority&appName=NamasteNodeJS", {
            family: 4
        });
        
}

module.exports = {connectDB}