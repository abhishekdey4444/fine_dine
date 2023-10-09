import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { app, database } from "../../../firebase/firebase"
import { collection,addDoc, getDoc,updateDoc, getDocs, setDoc, doc, arrayUnion, FieldValue, serverTimestamp } from 'firebase/firestore'
import { useState , useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import { async } from "@firebase/util";
import StarRating from "../../../utils/starRating";
import { MdLocationOn } from "react-icons/md"
import { AiFillStar } from "react-icons/ai"
import Restaurants from "../../../models/restaurants";
import mongoose from "mongoose";

function resDetails({restaurants,similarRes}){
    const [restaurantData,setRestaurantData]=useState()
    const [comment,setComment]=useState("")

    // const databaseRef =collection(database, 'RESTAURANTS')
    const [user,loading]=useAuthState(auth)
    const [uid,setUid]=useState()
    const router=useRouter();
    const [data,setData]=useState()
    const [userData,setUserData]=useState()
    const today=new Date()

    
    const getUser=async(props)=>{
        const databaseRef=doc(database,'USERS',props)
        await getDoc(databaseRef)
        .then((response)=>{
            setUserData(response.data())
            console.log(response.data().ratings)
            setData(response.data().ratings.find(x=>x.res_id===uid))
           
        }).catch((err)=>{
            console.error(err)
        })
    }
    useEffect(() => {
        if(!router.isReady) return;
        const resId=router.query.resDetails
        setUid(resId)
        getData(resId)
        if(user) getUser(user.email)
    }, [router.isReady,user])


    
    const getData = async (props)=>{
        const docRef=doc(database,'RESTAURANTS',props)
        await getDoc(docRef)
                .then((response)=>{
        setRestaurantData(response.data())
        // console.log(response.data())
    })

    
}

    return(
        <>
        
        <div className="flex flex-wrap items-center p-6 ml-10">
        {restaurants && (<h1 className="text-6xl font-bold">{restaurants.resName}</h1>)}
        </div>
        <div className="flex flex-wrap p-5 justify-center">
            <div className="w-1/3 items-center justify-center m-5 flex">
                <img src={restaurants.imgsrc} alt="RES-pic" className="bigResImage"/>
            </div>
            <div className="grow m-5 shadow-xl pt-5 border">
            {restaurants&&<div className="p-5 pb-10 ">
                    <div className="flex flex-wrap items-center gap-4 pb-5">
                        <h1 className="text-2xl font-bold">Cuisines : </h1>
                        <p className="text-lg">{restaurants.cuisines+" "}</p>
                        
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 pb-5">
                        <h1 className="text-2xl font-bold">Facilites : </h1>
                        <p className="text-lg">{restaurants.facilites}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pb-5">
                        <h1 className="text-2xl font-bold">Floors :</h1>
                        <p className="text-lg">{restaurants.floors}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pb-5">
                        <h1 className="text-2xl font-bold">Location :</h1>
                        <p className="text-lg">{restaurants.location}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pb-5">
                        <h1 className="text-2xl font-bold">Avg. Expense :</h1>
                        <p className="text-lg">{restaurants.ppc}</p>
                    </div>
                </div>}
                
                <div className="flex flex-wrap justify-around items-center mx-5 mb-5">
                    <button className="transition delay-100 duration-100 ease-in-out w-80 mt-3 px-4 py-3 text-[#DC143C] hover:opacity-80 border border-[#DC143C]">Bookmark</button>
                    <button onClick={(e)=>router.push(`/booking/${restaurants._id}`)} className="w-80 mt-3 px-4 py-3 text-white hover:opacity-80 bg-[#DC143C]">Dine-In</button>
                </div>
            </div>
        </div>
        <div className="shadow-lg p-5 m-10 bg-gray-100 rounded-lg">
            <div className="pb-10">
                <h1 className="text-2xl font-bold">Similar Restaurants</h1>
            </div>
            <div className="grid grid-cols-5 gap-5">
                {/* <div className="m-5"> */}
                {similarRes.slice(1,6).map((data)=>{
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
                                    router.push(`/restaurant/${data._id}`)
                                }
                                else{
                                    router.push("/login")
                                }
                                
                            }} className="mt-3 px-2 py-1 text-white hover:opacity-80 rounded bg-[#F0A500]">Dine-In</button>
                        </div>
                    </div>
                    )
                })}   
                {/* </div> */}
            </div>
        </div>
        <div className="flex flex-col p-5 ml-5">
            <div className="text-2xl font-bold pb-5">
                <h1>Rating</h1>
                <div className="flex gap-2">
                   {
                   ( user&&data&&uid)?(<StarRating res_id={uid} username={user.email} stars={restaurants.stars}/>):(user&&uid&&<StarRating res_id={uid} username={user.email} stars={null}/>)
                   
                   }
                </div>
            </div>
            <div className="text-2xl font-bold pb-5">
                <h1>Feedback</h1>
            </div>
            <div>
                <textarea onChange={event => setComment(event.target.value)} type="text" className="pl-2 border" rows={8} cols={72}/>
            </div>
            <div className="flex flex-end items-center">
                <button onClick={(e)=>{

                let dateT=today.toUTCString()
                let data= doc(database, 'RESTAURANTS',uid)
            
                updateDoc(data,{
                            comments:arrayUnion({username:user.email,text:comment,dateTime:dateT})
                    }).then(()=>{
                            console.log("comment sent-> to restaurant firebase")
                            router.reload(window.location.pathname)
                    })



                }} className=" rounded mt-3 px-1 py-1 text-white hover:opacity-80 bg-[#F0A500]">Comment</button>
            </div>
            <div className="pt-10 pb-20">
                <h1 className="text-2xl font-bold pb-5"> Reveiws</h1>
                <div className="overflow-auto h-60 pb-20 ">
                {restaurants&&restaurants.comments.map((data,i)=>{
                    const cnt=i+1
                    return (
                    
                        <div key={cnt} className="mt-15 shadow-md w-1/3 p-5 border mb-5">
                            <h1 className="">{data.text}</h1>
                        <div className="flex flex-wrap justify-start gap-2 mt-5">
                        {/* <img className="rounded-full" src={data.photoURL} width={20} height={10}/> */}
                        <h1 className="text-xs italic text-gray-300">{data.userName}</h1>
                        </div>
                        </div>
                        
                    )

                })}</div>
                
            
            </div>
        </div>
        <Footer/>
        </>
    )
}
export async function getServerSideProps(context){
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.MONGO_URI)
    }
    const { params,req,res,query } =context
    // console.log(query)
    
    let restaurants=await Restaurants.findById(query.resDetails)
    // let cuisines=restaurants.cuisines.split(" ")
    // console.log(restaurants.cuisines[0].split(",")[0])
    // console.log(restaurants.location)
    console.log(restaurants.cuisines)
    let similarRes= await Restaurants.find({cuisines:restaurants.cuisines[0]})
    return {
        props:{
            restaurants:JSON.parse(JSON.stringify(restaurants)),
            similarRes:JSON.parse(JSON.stringify(similarRes))
        },
    }
}
export default resDetails
