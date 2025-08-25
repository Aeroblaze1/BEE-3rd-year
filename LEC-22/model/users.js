const mongoose=require("mongoose")


const userschema= new mongoose.Schema({
    name :{
        type:String,
        require :true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String ,
        require:true

    },
    blogcount:{
        type:Number,
        default:0
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"blog"
    }],
    createdAT:{
        type:Date,
          default:Date.now 
    }
})
module.exports=mongoose.model("User",userschema)