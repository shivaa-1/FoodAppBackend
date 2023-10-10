const mongoose = require('mongoose');

const foodItem = mongoose.Schema(
{
    itemName:{
        type:String,
        required:[true,"Please Enter Item Name"]
    },
    quantity:{
        type:String,
        required:[true,"Please Enter Quantity"]
    },
    price:{
        type:String,
        reqquired:[true,"Please Enter Price"]
    },
    description:{
        type:String,
        required:[true,"Please Enter Description"]
    },
    picture:{
        type:String,
        required:[true,"Please Enter Password"]
    },
    restaurants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurantsUsers"
    }]
},{timestamps:true}
);

module.exports = mongoose.model('foodItem',foodItem);