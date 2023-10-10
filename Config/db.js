const mongoose=require('mongoose');

const connectDB= async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connection Established Successfully ${conn.connection.host}`);
    } catch (error) {
        console.log("Something Went Wrong");
        process.exit(1);
    }
};

module.exports=connectDB;
