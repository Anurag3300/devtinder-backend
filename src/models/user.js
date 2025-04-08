const mongooose = require("mongoose");

const UserSchema = new mongooose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
     type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});

const User = mongooose.model("User",UserSchema);

module.exports = User;