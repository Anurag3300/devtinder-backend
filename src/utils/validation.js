const validator = require('validator');
const validation = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("enter Valid Name");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("enter Valid Email");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("enter Valid Password");
    }
}

const validateEditProfileAllowed = (req)=>{
    const allowedEditFields = ["firstName","lastName","emailId","gender","photoUrl","about","skills"];
    const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
    return isEditAllowed ;
}
module.exports = {
    validation,
    validateEditProfileAllowed
}