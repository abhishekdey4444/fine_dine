import Restaurants from "../../../models/restaurants";
import connectDb from "../../../middleware/mongoose";

const handler =async(req,res)=>{

    if(req.method =='POST'){
        for(let i=0;i<req.body.length;i++){
            let res=new Restaurants({
                resName: req.body[i].resName,
                cuisines:req.body[i].cuisines,
                floors:req.body[i].floors,
                location:req.body[i].location,
                seats:req.body[i].seats,
                ppc:req.body[i].ppc,
                stars:req.body[i].stars,
                popularity:req.body[i].popularity,
                imgsrc:req.body[i].imgsrc,
                wAvg:req.body[i].wAvg,
                ratings:[{
                    userId:req.body[i].ratings[0].userId,
                    starrating:req.body[i].ratings[0].starrating
                }],
                comments:[{
                    userName:req.body[i].comments[0].userName,
                    text:req.body[i].comments[0].text
                }],
                phone:req.body[i].phone,
                email:req.body[i].email
            
            })
        await res.save()
        }
        res.status(200).json({success:"Success!"})
    }
    else{
        res.status(400).json({error:"This method is not allowed"})
    }
   
    
}
export default connectDb(handler)