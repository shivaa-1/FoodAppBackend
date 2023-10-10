const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const connectDB= require('./Config/db');

connectDB();

const PORT = process.env.PORT||7000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

app.use('/api/users',require('./Routes/CustomerRoute'));
app.use('/api/restaurantuser',require('./Routes/RestaurantUserRoute'));
app.use('/api/restaurantadmin',require('./Routes/FoodItemRoute'));

const {registerUser} = require('./Controllers/CustomerController');
const {loginUser} = require('./Controllers/CustomerController');
const{loginRestaurantUser, registerRestaurantUser , allRestaurant , getRestaurant} = require('./Controllers/RestaurantUserController');
const{createFoodItem,getAllItems,getItem,updateItem,deleteItem} = require('./Controllers/FoodItemController');

app.post('/api/users/register',registerUser);
app.post('/api/users/login',loginUser);

app.post('/api/restaurantuser/register',registerRestaurantUser);
app.post('/api/restaurantuser/login',loginRestaurantUser);
app.get('api/restauantuser/all',allRestaurant);
app.get('/api/restaurantuser/restaurant',getRestaurant);
app.get('/api/restaurantuser/allitems',getAllItems);
app.get('/api/restaurantuser/item/:id',getItem);

app.put('/api/restaurantadmin/createfooditem',createFoodItem);
app.put('/api/restaurantadmin/updateitem/:id',updateItem);
app.delete('/api/restaurantadmin/removeitem/:id',deleteItem);

app.listen(PORT,()=>{
    console.log('Server Started At Port '+PORT)
});