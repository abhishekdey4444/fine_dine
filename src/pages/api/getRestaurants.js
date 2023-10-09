import Restaurants from "../../../models/restaurants";
import connectDb from "../../../middleware/mongoose";

const handler =async(req,res)=>{
    let restaurants= await Restaurants.find()
    res.status(200).json({restaurants})
}
export default connectDb(handler)