import Dashboard from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {auth} from '../../../firebase/firebase' 
function orders(){
const router=useRouter();
const [user,loading]=useAuthState(auth);

// if(!user) router.push("/login");

return(
    <>
    <div className="flex">
        <div className='flex-none'>
            <Dashboard option="true" profile="false" orders="false"/>
        </div>

        <div className='grow bg-[#F0A500]'>
            <h1 className='text-white text-5xl font-bold pl-10 pt-5'>Orders</h1>
            <div className='flex align-center justify-center'>
                <div className='flex flex-col bg-white p-5 w-3/4 mt-20 overflow-auto h-96 gap-5'>
                    <div className='flex flex-rol justify-even bg-gray-200 p-3 gap-5'>
                        <div className='flex-none justify-center align-center'>
                            <img src='/plate.png' height={50} width={50} className=' justify-center align-center'/>
                        </div>
                        <div className='grow'>
                            <h1>Restaurant Name - Dum Pukht Begum's</h1>
                            <h1>Location - Hyderabad</h1>
                            <h1>Total Bill - 1201</h1>
                            <h1>Date - 24/01/2023</h1>
                        </div>
                    </div>

                    <div className='flex flex-rol justify-even bg-gray-200 p-3 gap-5'>
                        <div className='flex-none justify-center align-center'>
                            <img src='/plate.png' height={50} width={50} className=' justify-center align-center'/>
                        </div>
                        <div className='grow'>
                            <h1>Restaurant Name - Yi Jing</h1>
                            <h1>Location - Hyderabad</h1>
                            <h1>Total Bill - 884</h1>
                            <h1>Date - 07/03/2023</h1>
                        </div>
                    </div>

                    <div className='flex flex-rol justify-even bg-gray-200 p-3 gap-5'>
                        <div className='flex-none justify-center align-center'>
                            <img src='/plate.png' height={50} width={50} className=' justify-center align-center'/>
                        </div>
                        <div className='grow'>
                            <h1>Restaurant Name - Dum Pukht Begum's</h1>
                            <h1>Location - Hyderabad</h1>
                            <h1>Total Bill - 1201</h1>
                            <h1>Date - 24/01/2023</h1>
                        </div>
                    </div>

                    <div className='flex flex-rol justify-even bg-gray-200 p-3 gap-5'>
                        <div className='flex-none justify-center align-center'>
                            <img src='/plate.png' height={50} width={50} className=' justify-center align-center'/>
                        </div>
                        <div className='grow'>
                            <h1>Restaurant Name - Yi Jing</h1>
                            <h1>Location - Hyderabad</h1>
                            <h1>Total Bill - 884</h1>
                            <h1>Date - 07/03/2023</h1>
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