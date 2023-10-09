import Link from "next/link";
import { useState } from "react"
import {BiArrowBack} from "react-icons/Bi";
import { database,auth } from "../firebase/firebase";
import { collection,addDoc, updateDoc, doc, arrayUnion} from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";
function AddResModal({visiblity,onClose}) {
    if(!visiblity) return null

    const [user,loading]=useAuthState(auth)
    const [resname,setResname]=useState()
    const [location,setLocation]=useState()
    const [floors,setFloors]=useState()
    const [perpersoncost,setPerPersonCost]=useState()
    const [phone,setPhone]=useState()

    const addRes=()=>{
        addDoc(collection(database,'RESTAURANTS'),{
            res_name:resname,
            ppc:perpersoncost,
            floors: floors,
            location:location,
            phone:phone,
            email:user.email,
            comments:[],
            cuisines:[],
            ratings:[],
            stars: NaN
        }).then((docRef)=>{
            updateDoc(doc(database,'RESTAURANTS',docRef.id),{
                res_id:docRef.id
            })
            // updateDoc(doc(database,'HOSTS',user.email),{
            //     restaurants:arrayUnion()
            // })
            onClose()
            console.log("new res Data added to the restaurants->firebase")
            console.log(docRef)
        })
        .catch((err)=>{
            console.error(err)
        })
    }
  return (
   
        <div className='flex justify-center items-center backdrop-filter backdrop-blur-sm bg-[#DC143C] inset-0 fixed opacity-80 h-screen'>
            <div className=' flex flex-col bg  px-40 px-10 pt-10 pb-5 shadow-xl bg-white'>
                <div className="flex justify-between items-center">
                    <h1 className='text-gray-200 text-4xl font-bold ml-5 pb-10'>Add Restaurant</h1>
                    <button onClick={()=>onClose()} className="pb-10">
                    <h1 className='flex ml-2 mt-2 flex-wrap items-center text-xs'><BiArrowBack/>Back</h1>
                    </button>
                </div>

                <div className="flex flex-wrap gap-10">
                    <div className="flex flex-col justify-evenly gap-10">
                        <div className="flex justify-between">
                            <label className="text-2xl text-gray-600 px-5 ">Restaurant Name:</label>
                            <input type="text" className="px-6 py-1 border" onChange={(e)=>setResname(e.target.value)} required/>
                        </div>
                        <div className="flex justify-between">
                            <label className="text-2xl text-gray-600 px-5">Location:</label>
                            <input type="text" className="px-6 py-1 border" onChange={(e)=>setLocation(e.target.value)} required/>
                        </div>
                        <div className="flex justify-between">
                            <label className="text-2xl text-gray-600 px-5">Floors:</label>
                            <input type="number" className="px-6 py-1 border" onChange={(e)=>setFloors(e.target.value)} required/>
                        </div>
                        <div className="flex justify-between">
                            <label className="text-2xl text-gray-600 px-5">Phone:</label>
                            <input type="tel" className="px-6 py-1 border" onChange={(e)=>setPhone(e.target.value)} required/>
                        </div>
                        <div className="flex justify-between">
                            <label className="text-2xl text-gray-600 px-5">Per person Cost:</label>
                            <input type="number" className="px-6 py-1 border" onChange={(e)=>setPerPersonCost(e.target.value)} required/>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="flex justify-center pt-10">
                    {user &&<button className="w-80 mt-3 px-4 py-3 text-white hover:opacity-80 bg-[#DC143C]" onClick={()=>addRes()}>Submit</button>}
                </div>
            </div>
        </div>
   
  )
}
export default AddResModal

