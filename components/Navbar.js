import { useRouter } from "next/router";
import Image from "next/image";
import {useAuthState} from "react-firebase-hooks/auth";
import {database,auth} from '../firebase/firebase';
import Link from 'next/link';
import {BsDownload} from 'react-icons/bs'
import { useState } from "react";
import { doc,getDoc} from "firebase/firestore";
function navbar({searchbar}){
    const router = useRouter();
    const [user,loading] =useAuthState(auth);
    const [userData,setUserData]=useState()
 
    const getData= async ()=>{
        const databaseRef=doc(database,'USERS',user.email)
        await getDoc(databaseRef)
        .then((response)=>{
            setUserData(response.data())
       
        }).catch((err)=>{
            console.error(err)
        })
    }
    
    if(user)   getData()

    return (
        <>
    
        <nav className="navbar py-2 bg-[#F0A500]">
            
            <ul className="nav-list flex flex-wrap items-center justify-around text-gray-900 dark:text-white">
            <div>
                <Link href={"/"}>
                    <Image 
                    className="mr-10" 
                    src="/plate.png" 
                    alt="NA" 
                    width={50} 
                    height={50}/>
                </Link>
            </div>
            
                
            
            {/* <div className="nav-searchbox">
                <form className="max-w-sm px-10">
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
                        />
                    </div>
                </form>
            </div> */}

                <li><a className="mr-2 px-2 py-1 transition duration-700 ease-in-out text-white hover:text-black hover:px-2 hover:py-1 hover:bg-white md:mr-2 text-2xl font-semibold" href="#top">TOP</a></li>
                <li><a className="mr-2 px-2 py-1 transition duration-700 ease-in-out hover:px-2 hover:py-1 hover:bg-white md:mr-2 text-white hover:text-black text-2xl font-semibold" href="#trending">TRENDING</a></li>
                <li><a className="mr-2 px-2 py-1 transition duration-700 ease-in-out hover:px-2 hover:py-1 hover:bg-white md:mr-2 text-2xl text-white hover:text-black font-semibold" href="/aboutus">ABOUT US</a></li>
                <li><a className="mr-2 px-2 py-1 transition duration-700 ease-in-out hover:px-2 hover:py-1 hover:bg-white hover:text-black md:mr-2 group text-2xl font-semibold text-white">
                    MORE
                
                    <ul className="hidden group-hover:block fixed pt-3 hover:bg-white">
                        <li className="text-xs">
                            <a className="flex flex-wrap justify-center items-center gap-2 font-bold" href="">
                            <BsDownload/>
                            Download The App
                            </a>
                            </li>
                    </ul>
                    
                    </a>
                </li>

                
                {!user &&(
                <button onClick={(e)=>{
                    router.push("/login");
                }} 
                
                className="transition duration-300 ease-in-out bg-white hover:bg-white text-black-700 font-semibold hover:text-[#F0A500] py-2 px-4 border border-none hover:border-transparent ml-10 hover:bg-gray-100 shadow-lg">
                LOGIN
                </button>
                )}
                {user && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {userData&&(userData.admin==true?
                        <Link href={"/admin"}>
                            <div className="flex flex-row  justify-center align-center gap-2">
                                 <img className="w-12 rounded-full p-1 bg-white" src={"/user.png"} alt="pro-PIC" width={50} height={50}/>
                                 <p className="text-xs font-bold flex justify-center align-center text-white italic">{user.displayName}</p>
                            </div>
                            
                        </Link>:<Link href={"/dashboard"}>
                            <img className="w-12 rounded-full p-1 bg-white" src={"/user.png"} alt="pro-PIC" width={50} height={50}/>
                            <p className="text-xs font-bold text-white italic">{user.displayName}</p>
                        </Link>)}
                    </div>
                )
                }
            </ul>
        </nav>
        </>
    )
}

export default navbar;