const jwt = require('jsonwebtoken');
const restaurantUser = require('../Models/RestaurantUserModel');
const asyncHandler= require('express-async-handler');

const protect= asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const restaurantId = await restaurantUser.findById(decoded.id).select('-password');
            req.restaurant = restaurantId;

            next();
        } catch (error) {
            console.log(error);
            res.status(401).send("Not Authorized No Token")
        }
    }
});

module.exports = {protect};