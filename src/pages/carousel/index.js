import Restaurants from "../../../models/Restaurants";
import mongoose from "mongoose"
import { useState,useEffect } from "react";


function Carousel({restaurants}){
    const[trend,setTrend]=useState()
    function comparePopularity(a,b){
        return b.wAvg-a.wAvg
    }
    const resdata=restaurants.sort(comparePopularity)
    
    return (
        <>
            <div className=" bg-gray-200 p-5  overflow-auto ">
                {resdata.slice(0,10).map((data)=>{ return(
                <div className="flex flex-col align-center bg-white p-5 w-1/4 justify-center">
                    <div className="flex justify-center">
                        <img src={data.imgsrc} width={70} height={70} alt="na"/>
                    </div>
                    <div className="mt-5">
                        <h1>{data.resName}</h1>
                        <h1>{data.location}</h1>
                        <h1>{data.stars}</h1>
                        <h1>{data.ppc}</h1>
                        <h1>{data.popularity}</h1>
                    </div>
                </div>)
                })}
            </div>
        </>
    ) 
}
export async function getServerSideProps(context){
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.MONGO_URI)
    }
    let restaurants=await Restaurants.find()
    return {
        props:{restaurants:JSON.parse(JSON.stringify(restaurants))},
    }
}
export default Carousel