import Dashboard from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {auth} from '../../../firebase/firebase' 
function help(){
const router=useRouter();
const [user,loading]=useAuthState(auth);

// if(!user) router.push("/login");

return(
    <>
    <div className="flex">
        <div className='flex-none'>
            <Dashboard option="true" profile="false" help="false"/>
        </div>

        <div className='grow bg-[#F0A500]'>
            <h1 className='text-white text-5xl font-bold pl-10 pt-5'>Help</h1>
            <div className='flex align-center justify-center'>
                <div className='flex flex-col mt-10 gap-5 bg-white w-1/2 p-5'>
                    <div className='flex flex-col '>
                        <label className='text-lg'>Subject</label>
                        <input type="text" className='w-full p-2 focus:outline-none border'/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg'>Message</label>
                        <textarea className='w-full h-60 p-2 focus:outline-none border'/>
                    </div>
                    <button className="mt-5 transition duration-300 ease-in-out bg-black  text-white font-semibold  hover:text-[#F0A500] py-1 px-1 border border-none hover:border-transparent shadow-lg "
                        >SUBMIT</button>
                </div>
            </div>
        </div>
    </div>
    </>

)
}
export default help;