const mongoose =require('mongoose')

const HostSchema = new mongoose.Schema({
    username:{type:String},
    ratings:[{
        res_id:{type:String},
        starrating:{type:Number}
    }],
    orders:[{
        orderId:{type:String},
        userId:{type:String},
        timings:{type:String},
        date:{type:date},
        resId:{type:String},
        resName:{type:String},
        seatsBooked:{type:Number},
        totalCost:{type:String}
    }],
    restaurants:[{
        resId:{type:String},
        resName:{type:String},
        location:{type:String},
        seatsLeft:{type:Number},
        ppc:{type:Number}
    }],
    phone:{type:Number,unique:true},
    email:{type:String,required:true,unique:true}
},{timestamps:true})

export default mongoose.model("Hosts",HostSchema)