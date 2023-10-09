import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import {auth,database} from '../../../firebase/firebase'
import Link from 'next/link';
import {BiArrowBack} from "react-icons/Bi";
import { getDoc,doc } from 'firebase/firestore';

function dashboard(props){
    const router=useRouter();
    const [user,loading] = useAuthState(auth);
    
    const [userData,setUserData]=useState()

 useEffect(() => {
    if(user) getData()
 
   
 }, [])
 
    const getData= async ()=>{
        await getDoc(doc(database,'USERS',user.email))
        .then((response)=>{
            setUserData(response.data())
            console.log("dashboard !!!!!")
       
        }).catch((err)=>{
            console.error(err)
        })
    }

    if(loading) return <h1>Loading...</h1>;
    if(!user) router.push("/login");
    if(user){
        
    }
    return (
        <>
            
                <section className='flex'>
                <div className='flex-none shadow-4xl  h-screen'>
                    <div>
                    <Link href={"/"}>
                    {/* onClick={()=>router.back()} ----------------> can be used in routing to previous page*/}
                    <h1 className='flex ml-2 mt-2 flex-wrap items-center text-sm' ><BiArrowBack/>Home</h1>      
                    </Link>
                    
                    <div className='mt-5 flex flex-wrap items-center justify-center'>
                    
                        <img src='/plate.png' alt="NA" width={60} height={60}/>
                     
                    </div>
                    
                    <h1 className='p-5 font-bold text-4xl inline-block'>Dashboard</h1>
                    <h1 className='pl-6 pb-10 font-bold text-xs'>Hi!, {user && user.displayName
                        }</h1>
                    </div>
                        <hr/>
                    <div className='h-fit'>
                        <Link href={"/dashboard"}>
                        {(props.profile)?(
                        <p className="font-bold text-2xl p-5">Profile</p>
                        ):(
                            <p className="font-bold text-2xl p-5 bg-gray-100">Profile</p>
                            )}
                        </Link>

                        <Link href="/dashboard/orders">
                        {(!props.orders)?(
                        <p className="font-bold text-2xl p-5 ">Orders</p>
                        ):(
                            <p className="font-bold text-2xl p-5 bg-gray-100">Orders</p>
                            )}
                        </Link>
                        
                        <Link href={"/dashboard/settings"}>
                        {(!props.settings)?
                        (<p className="font-bold text-2xl p-5 ">Settings</p>):(<p className="font-bold text-2xl p-5 bg-gray-100 ">Settings</p>)
                        }
                        </Link>

                        <Link href={"/dashboard/help"}>
                        {(!props.help)?(
                        <p className="font-bold text-2xl p-5 ">Help</p>
                        ):(<p className="font-bold text-2xl p-5 bg-gray-100">Help</p>)    
                    }
                        </Link>
                        <button className=" ml-5 mt-5 transition duration-300 ease-in-out bg-[#F0A500]  text-black-700 font-semibold  hover:text-white py-1 px-1 border border-none hover:border-transparent shadow-lg mr-10"
                        onClick={() => auth.signOut()}>Sign out</button>
                        
                        
                        {
                        ((userData)&&(!userData.host))?(<Link href={"/host"}><h1 className='underline text-xs pt-5 ml-5 text-gray-500 '>Become a Host</h1></Link>):(<Link href={"/host/dashboard"}><h1 className='text-xs mt-5 ml-5 text-gray-500 '>Go to Host Account</h1></Link>)
                        }
                        {/* <Link href={"/host"}><h1 className='underline text-xs pt-5 ml-5 text-gray-500 '>Become a Host</h1></Link> */}
                    </div>
                </div>
                {(!props.option) && (user) &&(
                <div className='grow bg-[#f0a500] h-screen'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='profile-pic mt-20 bg-white p-2 rounded-full'>
                            <img className='rounded-full' src={"/user.png"} alt="pro-pic" width={100} height={100}/>
                        </div>
                        
                        <div className='profile-details grow mt-20  p-5 bg-white shadow-xl'>
                        <h1 className='p-5 font-bold text-lg'>Name: {user&&user.displayName}</h1>
                        <h1 className='p-5 font-bold text-lg'>Username: {user && user.email}</h1>
                        <h1 className='p-5 font-bold text-lg italics'>Password: {user && user.uid}</h1>
                        </div>
                    </div>
                </div>)}
                </section>
    
        </>
    )
}
export default dashboard;