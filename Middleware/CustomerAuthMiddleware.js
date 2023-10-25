const jwt = require('jsonwebtoken');
const customer = require('../Models/CustomerModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        try {
            token=req.headers.authorization.split(' ')[1];
            const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log(decoded)
            const user= await customer.findById(decoded.id).select('-password');
            req.user = user;
            console.log(user);

            next();
        } catch (error) {
            console.log(error);
            res.status(401).send("Not Authorization No Token")
        }
    }
});

module.exports = {protect};
