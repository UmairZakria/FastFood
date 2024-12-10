const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    phonenumber : Number,
    city : String,
    
    password : String,
    cart:[]


})


//product name , product stock, product images, rating ,discription, product price 

const UserModel = mongoose.model("rigister", UserSchema)
module.exports = UserModel