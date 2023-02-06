const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String},
    email:String,
    pass:String,
    role:{type:String, enum:["manager","customer"],default:"customer"}
})

const UserModel = mongoose.model("userdetails",userSchema)

module.exports={UserModel}