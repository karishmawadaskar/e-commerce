import express from 'express';
import mongoose from 'mongoose'; // ✅ Correct import
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
//connect to mongoose
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        if (conn) {
            console.log(`MongoDB connected successfully`);
        }
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process if connection fails
    }
};

app.get("/helth",(req, res)=>{
    res.json({
        success:true,
        message:"Server is running"
    })
});

app.use("*",(req,res)=>{
    res.status(404).json({success:false,message:"API not found"});
});

const PORT = process.env.PORT|| 5000;

app.listen(PORT,()=>{
   console.log(`Server is running on ${PORT}`)
   connectDB();
});