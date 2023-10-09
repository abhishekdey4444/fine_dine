import Dashboard from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {auth,database} from '../../../firebase/firebase' 
import { useState,useEffect } from "react";
import { doc,getDoc,updateDoc} from "firebase/firestore";

function orders(){
    const router=useRouter();
    const [user,loading]=useAuthState(auth);
    const [userData,setUserData]=useState()
    const [reqData,setReqData]=useState()

    const getData= async ()=>{
        await getDoc(doc(database,'USERS',user.email))
        .then((response)=>{
            // setUserData(response.data())
       console.log(response.data())
       console.log("i am here")
        }).catch((err)=>{
            console.error(err)
        })
    }
    const acceptHost=(username)=>{
        updateDoc(doc(database,'USERS',username),{
            host:true
        })
    }
    const getQueue= async ()=>{
        await getDoc(doc(database,'ADMINS','hostReq'))
        .then((response)=>{
            setReqData(response.data())
            console.log("req !!!!!!!!!!")
       
        }).catch((err)=>{
            console.error(err)
        })
    }

    
    if(loading) return <h1>Loading...</h1>;
    // if(!user) router.push("/login");
    if(user!=null){
       
    }

return(
    <>
    <div className="flex">
        <div className='flex-none'>
            <Dashboard option="true" profile="false" orders="false"/>
        </div>

        <div className='grow bg-[#880ED4]'>
            <h1 className='text-white text-5xl font-bold pl-10 pt-5'>Host Requests</h1>
            <div className='flex align-center justify-center'>
                <div className='flex flex-col bg-white p-5 w-3/4 mt-20 overflow-auto h-96 gap-5'>
                {/* onClick={()=>acceptHost(data.hostUsername)} */}
                    
                    {/* {
                    reqData&&(reqData.hostQueue.map((data)=>{
                    <div className='flex flex-rol justify-even bg-gray-200 p-3 gap-5'>
                        <div className='grow'>
                            <h1>Host Name :{data.hostName} </h1>
                            <h1>Host Username : {data.hostUsername}</h1>
                            <h1>Host UId : {data.userId}</h1>
                            <div className='flex flex-row gap-5 '>
                                <button className="transition duration-300 ease-in-out bg-[#00D100] text-black-700 font-semibold hover:text-white py-1 px-2 mt-5 border border-none hover:border-transparent shadow-lg">Accept</button>
                                <button className="transition duration-300 ease-in-out bg-[#D10000]  text-black-700 font-semibold hover:text-white py-1 px-2 mt-5 border border-none hover:border-transparent shadow-lg">Reject</button>
                            </div>
                        </div>
                    </div>
                 }))
                 } */}

                    <div className='flex flex-rol justify-even bg-gray-200 p-3 gap-5'>
                        <div className='grow'>
                            <h1>Host Name : Abhishek Workspace </h1>
                            <h1>Host Username : workspace.abhishek@gmail.com</h1>
                            <h1>Host UId : 5fds654fs64vgh6474d66964w</h1>
                            <div className='flex flex-row gap-5 '>
                                <button className="transition duration-300 ease-in-out bg-[#00D100] text-black-700 font-semibold hover:text-white py-1 px-2 mt-5 border border-none hover:border-transparent shadow-lg">Accept</button>
                                <button className="transition duration-300 ease-in-out bg-[#D10000]  text-black-700 font-semibold hover:text-white py-1 px-2 mt-5 border border-none hover:border-transparent shadow-lg">Reject</button>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-rol justify-even bg-gray-200 p-3 gap-5'>
                        <div className='grow'>
                            <h1>Host Name : Mainak Banik </h1>
                            <h1>Host Username : banik.mainak@gmail.com</h1>
                            <h1>Host UId : dgs346gsej654jgf6464fweffg</h1>
                            <div className='flex flex-row gap-5 '>
                                <button className="transition duration-300 ease-in-out bg-[#00D100] text-black-700 font-semibold hover:text-white py-1 px-2 mt-5 border border-none hover:border-transparent shadow-lg">Accept</button>
                                <button className="transition duration-300 ease-in-out bg-[#D10000]  text-black-700 font-semibold hover:text-white py-1 px-2 mt-5 border border-none hover:border-transparent shadow-lg">Reject</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </>

)
}
export default orders;