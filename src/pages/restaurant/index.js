import { MdLocationOn } from "react-icons/md"
import { AiFillStar } from "react-icons/ai"
import { useAuthState } from "react-firebase-hooks/auth"
import {auth,database} from "../../../firebase/firebase"
import {collection,getDocs} from "firebase/firestore"
import {useState,useEffect} from "react"
import Navbar from "../../../components/Navbar"
import { useRouter } from "next/router"
import Restaurants from "../../../models/restaurants";
import mongoose from "mongoose"
import Link from "next/link"

function restaurant({restaurants}){
    const [user,loading]=useAuthState(auth)
   

    // useEffect(() => {
    //   getData()
    // }, [])
    
    const databaseRef=collection(database,'RESTAURANTS')
    const [resData,setResData]=useState([])
    const router =useRouter()
    const [search,setSearch]=useState("")
    const [ppcRange,setPpcRange]=useState()
    // const getData= async ()=>{
    //     await getDocs(databaseRef)
    //     .then((response)=>{
    //         setResData(response.docs.map((data)=>{
    //             return {...data.data(),id: data.id}
    //         }))
    //     }).catch((err)=>{
    //         console.error(err)
    //     })
    // }
   
    
   
    return (
        <>
        <div className="flex flex-row justify-center items-center bg-[#F0A500]">
            <div className="flex-none w-14 ml-5">
                <img src="/plate.png" className="fineLogo"/>
            </div>
            <Link href="/"><h1  className="flex-none w-44 font-bold text-3xl text-white">Fine Dine.</h1></Link>
            <div className="grow flex flex-wrap justify-center items-center px-10">
            <div className="nav-searchbox grow ">
                <form className="px-10">
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full py-2 pl-12 pr-4 text-gray-500  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                            onChange={(e)=>{setSearch(e.target.value)}}
                        />
                    </div>
                </form>
            </div>
            </div>
            {!user &&(
                <button onClick={(e)=>{
                    window.open("/login");
                }} 
                
                className="flex-none transition duration-300 ease-in-out bg-white hover:bg-white text-black-700 font-semibold hover:text-[#F0A500] py-2 px-4 border border-none hover:border-transparent ml-10 hover:bg-gray-100 shadow-lg">
                LOGIN
                </button>
                )}
                {user && (
                    <div className="flex-none w-64 m-3">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Link href={"/dashboard"}>
                            <img className="w-12 rounded-full p-1 bg-white" src={"/user.png"} alt="pro-PIC" width={50} height={50}/>
                        </Link>
                        <Link href={"/dashboard"}>
                            <p className="text-xs font-bold text-white italic">{user.displayName}</p>
                        </Link>
                    </div>
                    </div>
                )
                }
        </div>
        <div className="flex flex-row justify-around ">
            {/* <div className="flex-none w-1/6 p-5 shadow-5xl h-100">
                <h1 className="text-center text-xl font-bold">Sort</h1>
                <div className="flex flex-col align-center justify-center">
                    <input type="range" min="100" max="300" step="50" defaultValue={100} onChange={(e)=>setPpcRange(e.target.value)}></input>
                    <div className="flex flex-row justify-between">
                        <h1 className="text-xs text-gray-400">100</h1>
                        <h1 className="text-xs text-gray-400">300</h1>
                    </div>
                    <h1>Your Budget: {ppcRange}</h1>
                </div>
                
                
            </div> */}
            
            <div className="grow p-5 bg-gray-500 h-128 overflow-hidden">
                <div className="grid grid-cols-3 gap-3 ">
                {restaurants.filter((res)=>{
                    if(search==""){
                        return res
                    }
                    else if(res.resName.toLowerCase().includes(search.toLowerCase())){
                        return res
                    }
                })
                .map((data)=>{
                    return (
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
                    )})}
                </div>
            </div>

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
export default restaurant;
