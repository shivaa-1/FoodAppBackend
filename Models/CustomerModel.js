const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Enter Name"]
        },
        email:{
            type:String,
            required:[true,"Please Enter Email"]
        },
        mobile_no:{
            type:String,
            required:[true,"Please Enter Mobile No."]
        },
        password:{
            type:String,
            required:[true,"Please Enter Password"]
        }
    },
    {
        timestamps:true
    }
);

module.exports= mongoose.model('Customer',customerSchema);