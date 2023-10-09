import Dashboard from './index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {auth} from '../../../../firebase/firebase' 
import { useState } from 'react';
import AddResModal from '../../../../utils/addResModal';


function manageRestaurants(){
const router=useRouter();
const [user,loading]=useAuthState(auth);
const [visible,setVisible]=useState(false)


return(
    <>
    <div className="flex">
        <div className='flex-none'>
            <Dashboard option="true" profile="false" settings="false"/>
        </div>

        <div className='grow bg-[#DC143C] h-screen'>
            <h1 className='text-white text-3xl font-bold pl-10 pt-5'>Manage Restaurants</h1>
            <div className='flex  justify-center items-center'> 
                <div className='flex flex-col  mt-20  bg-white h-2/3 w-3/4 shadow-xl'>
                    
                    <div className=' ml-2 py-2 mb-3'>
                        <button onClick={event =>setVisible(true)} className=' px-6 py-2 bg-[#DC143C] text-white font-semibold shadow-xl'>Add</button>
                    </div>
                    <div className='overflow-auto w-full  h-80 px-2 mb-3'>
                        <div className='p-2 border shadow-xl bg-gray-100 mb-5'>
                            <img className='ml-2' src='/plate.png' width={50} height={20}/>
                            <h1 className='text-xl mt-5'>Restaurant Name - Good Life</h1>
                            <h1 className='text-xl mt-1'>Location - Mumbai</h1>
                            <h1 className='text-xl mt-1'>Restaurant ID - glmum123</h1>
                            <h1 className='text-xl mt-1'>Stars - 4/5</h1>
                            <h1 className='text-xl mt-1'>Seats Left - 7</h1>
                         </div>

                         <div className='p-2 border shadow-xl bg-gray-100'>
                            <img className='ml-2' src='/plate.png' width={50} height={20}/>
                            <h1 className='text-xl mt-5'>Restaurant Name - Ginger</h1>
                            <h1 className='text-xl mt-1'>Location - Bokaro</h1>
                            <h1 className='text-xl mt-1'>Restaurant ID - gibo456</h1>
                            <h1 className='text-xl mt-1'>Stars - 4/53.5</h1>
                            <h1 className='text-xl mt-1'>Seats Left - 9</h1>
                         </div>

                         <div className='p-2 border shadow-xl bg-gray-100'>
                            <img className='ml-2' src='/plate.png' width={50} height={20}/>
                            <h1 className='text-xl mt-5'>Restaurant Name - Diablo</h1>
                            <h1 className='text-xl mt-1'>Location - Agra</h1>
                            <h1 className='text-xl mt-1'>Restaurant ID - diag147</h1>
                            <h1 className='text-xl mt-1'>Stars - 4.5</h1>
                            <h1 className='text-xl mt-1'>Seats Left - 15</h1>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AddResModal visiblity={visible} onClose={()=>setVisible(false)}/>
    </>

)
}
export default manageRestaurants;