const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productname: {
        type:String,
        required:true,
    },
    discription :{
        type:String,
        required:true,
    },
    stock: {
        type:Number,
        required:true,
    },
    images:{
        type:[String],
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    

})
 
const ProductModel = mongoose.model("products",ProductSchema)
module.exports = ProductModel