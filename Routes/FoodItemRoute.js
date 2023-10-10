const express = require('express');
const router = express.Router();
const {createFoodItem} = require('../Controllers/FoodItemController');
const{updateItem}=require('../Controllers/FoodItemController');
const{deleteItem}=require('../Controllers/FoodItemController');
const {protect} = require('../Middleware/RestaurantAuthMiddleware');

router.put('/createfooditem',protect,createFoodItem);
router.put('/updateitem/:id',updateItem);
router.delete('/removeitem/:id',deleteItem);

module.exports = router;