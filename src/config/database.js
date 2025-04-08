const mongoose = require("mongoose");

const ConnectDB = async ()=>{
    await mongoose.connect("mongodb+srv://anuragpandey4142:Asdf%409415@anuragnode.louix.mongodb.net/devTender");
};

module.exports = ConnectDB;