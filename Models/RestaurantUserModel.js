const  mongoose = require('mongoose');

const restaurantUserSchema = mongoose.Schema(
{
    restaurantName:{
        type:String,
        required:[true,"Please Enter Restaurant Name"]
    },
    restaurantemail:{
        type:String,
        required:[true,"Please Enter EmailID"]
    },
    address:{
        type:String,
        required:[true,"Please Enter Adresss"]
    },
    openingtime:{
        type:String,
        required:[true,"Please Enter Opening Time"]
    },
    closingtime:{
        type:String,
        required:[true,"Please Enter Closing Time"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Password"]
    },
    menu:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodItem"        
    }]
},
    {timestamps:true}
);

module.exports=mongoose.model("restaurantUsers",restaurantUserSchema);