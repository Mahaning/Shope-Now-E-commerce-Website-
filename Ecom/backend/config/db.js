import colors from "colors";
import mongoose from "mongoose";


const connectDB=async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to DB ${conn.connection.host} `.bgWhite.black)

    }catch(error){
        console.log(`DB connection failed error: ${error}`.bgRed.white);
    }
}

export default connectDB;