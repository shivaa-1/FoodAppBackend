const express = require('express');
const { registerRestaurantUser } = require("../Controllers/RestaurantUserController");
const {loginRestaurantUser} = require('../Controllers/RestaurantUserController');
const {allRestaurant} = require('../Controllers/RestaurantUserController');
const{getRestaurant}= require('../Controllers/RestaurantUserController');
const{getAllItems}=require('../Controllers/FoodItemController');
const{getItem}=require('../Controllers/FoodItemController');
const{protect}=require('../Middleware/RestaurantAuthMiddleware');
const router = express.Router();

router.post('/register',registerRestaurantUser);
router.post('/login',loginRestaurantUser);
router.get('/all',allRestaurant);
router.get('/restaurant',protect,getRestaurant);
router.get('/allitems',getAllItems);
router.get('/item/:id',protect,getItem);

module.exports = router;