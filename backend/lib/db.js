import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

export default connectDb;


// const connectDb = async () =>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URL);
//         console.log(`Mongo connected: ${conn.connection.host}`)
//     }catch(err){
//         console.log("MongoDB connection ERROR", err.message);
//     }
// }

// module.exports = connectDb