import Dashboard from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {auth} from '../../../firebase/firebase'
import { AiFillEdit } from "react-icons/ai"
import { useState } from 'react';
function settings(){
const router=useRouter();
const [user,loading]=useAuthState(auth);
const [edit,setEdit]=useState(true)
// if(!user) router.push("/login");
const editToggle=()=>{
    setEdit(!edit)
}

return(
    <>
    <div className="flex">
        <div className='flex-none'>
            <Dashboard option="true" profile="false" settings="false"/>
        </div>

        <div className='grow bg-[#F0A500]'>
            <h1 className='text-white text-5xl font-bold pl-10 pt-5'>Settings</h1>
            <div className='flex align-center justify-center'>
                {user&&<div className='flex flex-col mt-10 gap-3 bg-white w-1/2 p-5'>
                    <div className='flex flex-row justify-end gap-1 cursor-pointer' onClick={()=>editToggle()}>
                        <h1 className='text-xs'>Edit</h1>
                        <AiFillEdit/>
                    </div>
                    <div className='flex flex-col '>
                        <label className='text-lg'>Name</label>
                        <input type="text" className='w-full p-2 focus:outline-none border' disabled={edit} defaultValue={user.displayName}/>
                    </div>
                    <div className='flex flex-col '>
                        <label className='text-lg'>Phone</label>
                        <input type="phone" className='w-full p-2 focus:outline-none border' disabled={edit} defaultValue={"9999999"}/>
                    </div>
                    <div className='flex flex-col '>
                        <label className='text-lg'>Password</label>
                        <input type="password" className='w-full p-2 focus:outline-none border' disabled={edit} defaultValue={user.uid}/>
                    </div>
                    <div className='flex flex-col '>
                        <label className='text-lg'>Confirm-password</label>
                        <input type="password" className='w-full p-2 focus:outline-none border' disabled={edit} defaultValue={user.uid}/>
                    </div>
                    <button className="mt-5 transition duration-300 ease-in-out bg-black  text-white font-semibold  hover:text-[#F0A500] py-1 px-1 border border-none hover:border-transparent shadow-lg" disabled={edit}
                        >SAVE</button>
                </div>}
            </div>
        </div>
    </div>
    </>

)
}
export default settings;