const mongoose= require('mongoose');
const Customer = require('../Models/CustomerModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser =async(req,res)=>{
    const{name,email,mobile_no,password}=req.body;

    try {
        const user = await Customer.findOne({email});

        if(!name||!email||!mobile_no||!password){
           return res.status(402).send("Please Enter Valid Credentials")
        }

        if (user) {
           return res.status(400).send("User Already Exist");            
        }

        const newPassword =await bcrypt.hash(password,10);

        const newUser =await Customer.create({
            name,
            email,
            mobile_no,
            password:newPassword
        })

        await newUser.save();

        res.status(200).send({
            id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            mobile_no:newUser.mobile_no
        });
        
    } catch (error) {
        console.log("Something Went Wrong" +error)

    }
};

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user = await Customer.findOne({email});

        if(!email||!password){
            return res.status(402).send("Please Enter Valid Credentials")
        }

        if(!user){
            return res.status(401).send("User Not Found")
        }

        const newPassword = await bcrypt.compare(password,user.password);
        if (newPassword) {
            const token = await jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE});
            res.status(200).send({
                id:user._id,
                email:user.email,
                token
            });
        }else{
            res.status(400).send("Please Enter Credentials Details")
        }

    } catch (error) {
        res.status(400);
        console.log(error);
    }
});

const getMe =async(req,res)=>{
    console.log(req.user);
    console.log(req.user.id);
    const user = await Customer.findById(req.user._id);
    
    res.status(200).send({
        name:user.name,
        email:user.email,
        token:user.token
    })
};

module.exports ={registerUser,loginUser,getMe};
