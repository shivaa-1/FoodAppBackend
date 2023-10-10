const jwt = require('jsonwebtoken');
const customer = require('../Models/CustomerModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async(req,res,next)=>{
    let token;

    if(req.header.authorization&&req.header.authorization.startsWith("Bearer")){
        try {
            token=req.header.authorization.split(' ')[1];
            const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
            const userId = await customer.findById(decoded.id).select('-password');
            req.user = userId;

            next();
        } catch (error) {
            console.log(error);
            res.status(401).send("Not Authorization No Token")
        }
    }
});

module.exports = {protect};
