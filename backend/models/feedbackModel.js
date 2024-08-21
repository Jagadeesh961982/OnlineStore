import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

})

export default mongoose.model("Feedbacks",feedbackSchema)