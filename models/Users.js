const mongoose =require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    userName:{type:String,required:true},
    password:{type:String,required:true},
    host:{type:Boolean,default:false},
    ratings:[{
        res_id:{type:String},
        starrating:{type:Number}
    }],
    bookings:[{
        orderId:{type:String},
        resId:{type:String},
        resName:{type:String},
        timing:{type:String},
        date:{type:date},
        seatsBooked:{type:Number},
        totalCost:{type:String}
    }],
    bookmarks:[{
        resId:{type:String},
        resName:{type:String},
    }],
    location:[{
        city:{type:String},
        state:{type:String},
        pincode:{type:String},
    }],
    phone:{type:Number,unique:true},
    email:{type:String,required:true,unique:true}
},{timestamps:true})

export default mongoose.model("Users",UserSchema)