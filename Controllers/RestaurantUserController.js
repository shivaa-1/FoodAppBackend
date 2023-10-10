const restaurantUsers = require('../Models/RestaurantUserModel');
const asyncHandler = require('express-async-handler');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

const registerRestaurantUser =asyncHandler(async(req,res)=>{
    const{restaurantName,restaurantemail,address,openingtime,closingtime,password}=req.body;
    
    try {
        const user = await restaurantUsers.findOne({restaurantemail});

    if(!restaurantName||!restaurantemail||!address||!openingtime||!closingtime||!password){
        return res.status(401).send("Please Enter Valid Credentials")
    }

    if(user){
        return res.status(400).send("User Already Exist")
    }

    const newPassword = await bcrypt.hash(password,10);

    const newUser = await restaurantUsers.create({
        restaurantName,
        restaurantemail,
        address,
        openingtime,
        closingtime,
        password:newPassword
    })

    await newUser.save();

    res.status(200).send({
        id:newUser._id,
        restaurantName:newUser.restaurantName,
        restaurantemail:newUser.restaurantemail,
        address:newUser.address,
        openingtime:newUser.openingtime,
        closingtime:newUser.closingtime
    })
        
    } catch (error) {
        console.log(error)        
    }

});

const loginRestaurantUser = asyncHandler(async(req,res)=>{
    const {restaurantemail,password}=req.body;

    try {
        const user = await restaurantUsers.findOne({restaurantemail});

        if (!restaurantemail||!password) {
            return res.status(401).send("Please Enter Credentials Details")
        }

        if (!user) {
            return res.status(400).send("User Not Found")
        }

        const newPassword = await bcrypt.compare(password,user.password);

        if(newPassword){
            const token =jwt.sign({id:user._id},process.env.JWT_sECRET_KEY,{expiresIn:process.env.JWT_EXPIRE});

            res.status(200).send({
                id:user._id,
                restaurantName:user.restaurantName,
                email:user.restaurantemail,
                address:user.address,
                closingtime:user.closingtime,
                openingtime:user.openingtime,
                token
            })
        }else{
            res.status(400).send("Please Enter Credentials Details")
        }
       
    } catch (error) {
        console.log(error)
    };

});

// get all restaurant
const allRestaurant = asyncHandler(async(req,res)=>{
    const restaurants = await restaurantUsers.find({})
    .select("-password -createdAT -updatedAt")
    .populate("menu","itemName quantity price description picture")
    .exec();

    res.status(200).send({data:{restaurants}});
});

//get restaurant by id
const getRestaurant = asyncHandler(async(req,res)=>{
    const restaurant = await restaurantUsers.find({_id:req.restaurant.id})
    .select("-password -createdAt -updatedAt")
    .populate("menu","itemName quantity price description picture")
    .exec();

    res.status(200).send({data:{restaurant}});
});

module.exports = {
    registerRestaurantUser,
    loginRestaurantUser,
    allRestaurant,
    getRestaurant
};