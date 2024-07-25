import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoute.js';
import errorMidleware from './middleware/error_middleware.js';
import userRoutes from "./routes/userRoutes.js";
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:["http://localhost:3000"],
        credentials:true
    }
));

app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

dotenv.config({path:'./config/config.env'});



// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err)
})

// cloudinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


// Routes
app.get("/",(req,res)=>{
    res.send("server running")
})

app.use("/api",productRoutes)

// user routes
app.use("/api",userRoutes)

// order routes
app.use("/api",orderRoutes)

// error middleware
app.use(errorMidleware)


app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
});