const foodItem = require('../Models/FoodItemModel');
const restaurantUsers = require('../Models/RestaurantUserModel');
const asyncHandler = require('express-async-handler');

// only admin can use this route
const createFoodItem = asyncHandler(async(req,res)=>{
    const {itemName,quantity,price,description,picture} = req.body;

    console.log(req.restaurant._id);

    try {
        const item = await foodItem.create({
            itemName,
            quantity,
            price,
            description,
            picture
        });
    
        const menu = await restaurantUsers.findByIdAndUpdate(
            {_id:req.restaurant._id},
            {$push:{menu:item.id}},
            {new:true}
        );

        const updateRestaurant = await foodItem.findByIdAndUpdate(
            {_id:item._id},
            {$push:{restaurants:req.restaurant._id}},
            {new:true}
        )
    
        res.status(201).send(menu);    
        
    } catch (error) {
        console.log(error)
    } 
});

//all user can access this route and get the all food items
const getAllItems = asyncHandler(async(req,res)=>{

    const items = await foodItem.find({})
    .select('-updatedAt -CreatedAt')
    .exec();

    res.status(200).send(items)
});

//only get the selected food item all user user use this
const getItem = asyncHandler(async(req,res)=>{
    const {id}=req.params;

    const item = await foodItem.findById({_id:id})
    .select('-updateAt -createdAt')
    .exec();

    res.status(200).send(item);
});

const updateItem = asyncHandler(async(req,res)=>{
    const{id}= req.params;
    const{itemName,quantity,price,description,picture}=req.body;

    const findItem = await foodItem.findById({_id:id});

    if(!findItem){
        return res.status(400).send("There Is No Item To Update")
    };

    const updatedItem = await foodItem.findByIdAndUpdate(
        {_id:id},
        {itemName,quantity,price,description,picture},
        {new:true}
    );

    res.status(200).send(updatedItem);

});

const deleteItem = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const findItem = await foodItem.findById({_id:id});

    if(!findItem){
        return res.status(400).send("There Is No Item To Delete")
    };

    await foodItem.findByIdAndDelete(
        {_id:id},
        {new:true}
    );

    res.status(200).send({Status:"Success"})
});


module.exports = {
    createFoodItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem
};