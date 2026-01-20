import mongoose from "mongoose";

const connectDB=async()=>{
    try{

        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Atlas connected");

    }catch(err){
        console.log("DB Connection Failed");
        console.log(err.message);

    }
}
export default connectDB;