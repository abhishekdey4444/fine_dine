const mongoose =require('mongoose')
const RestaurantSchema = new mongoose.Schema({
    resName: {type:String,required:true},
    cuisines:[{type:String,default:'Indian',required:true}],
    floors:{type:String,default:1,required:true},
    location:{type:String},
    seats:{type:Number,default:1,required:true},
    ppc:{type:Number,required:true},
    stars:{type:Number},
    popularity:{type:Number},
    imgsrc:{type:String},
    wAvg:{type:Number},
    ratings:[{
        userId:{type:String},
        starrating:{type:Number}
    }],
    comments:[{
        userName:{type:String},
        text:{type:String},
    }],
    phone:{type:Number},
    email:{type:String,required:true}
},{timestamps:true})
mongoose.models={}
export default mongoose.model("Restaurants",RestaurantSchema)