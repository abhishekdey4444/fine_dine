import Restaurants from "../../models/Restaurants";
import mongoose from "mongoose"
import { useState,useEffect } from "react";
import { MdLocationOn } from "react-icons/md"
import { AiFillStar } from "react-icons/ai"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
function trending({restaurants}){
    const[user,loading]=useAuthState(auth)
    function comparePopularity(a,b){
        return (b.wAvg-a.wAvg)&&(a.stars>4||b.stars>4)
    }
    const resdata=restaurants.sort(comparePopularity)
    
    return (
        <>
            <div className="grid grid-cols-5 gap-5 p-5 bg-gray-500 rounded">
                {/* <div className="m-5"> */}
                {resdata.slice(1,6).map((data)=>{
                    return(
                        <div className="px-10 py-5 shadow-xl bg-white rounded-md">
                            <div className="flex flex-wrap items-center justify-center h-fit">
                                <img src={data.imgsrc}  className="resImage"/>
                            </div>
                            <hr className="mt-2"/>
                            <h1 className="mt-2 ml-1 font-bold">{data.resName}</h1>
                        
                             <p  className="text-sm text-gray-600 italic flex flex-wrap items-center"><MdLocationOn/>{data.location}</p>
                             <p  className="text-xs text-gray-600 gap-0.5 italic flex flex-wrap items-center"><AiFillStar/>{data.stars+" /5"}</p>
                        {/* <p key={data} className="text-sm text-gray-600 italic flex flex-wrap items-center">{data.res_id}</p> */}

                        <div className="flex flex-wrap justify-center items-center">
                            <button onClick={(e)=>{
                                if(user){
                                    window.open(`/restaurant/${data._id}`)
                                }
                                else{
                                    window.open("/login")
                                }
                                
                            }} className="mt-3 px-2 py-1 text-white hover:opacity-80 rounded bg-[#F0A500]">Dine-In</button>
                        </div>
                    </div>
                    )
                })}   
                {/* </div> */}
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
export default trending