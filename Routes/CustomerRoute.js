const express = require('express');
const router = express.Router();
const {registerUser,loginUser, getMe} = require('../Controllers/CustomerController');
const { protect } = require('../Middleware/CustomerAuthMiddleware');


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getme',protect,getMe);

module.exports = router;