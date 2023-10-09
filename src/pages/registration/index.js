import Link from "next/link";
import { BiArrowBack } from "react-icons/Bi"
import { useRouter } from "next/router";
import P_ComboBox from "../../../utils/p_comboBox"
function register(){
    return(
        <>
        <section className='bg-[#F0A500] min-h-screen'>
            <div className='flex flex-wrap items-center justify-around h-screen divide-x-2'>
                
                <div className='flex flex-wrap bg-white justify-around shadow-2xl py-5 px-40'>
                <div className='img m-5 p-10 flex items-center justify-center'>
                    <Link href={"/"}>
                        <img src={"/plate.png"} alt="NA" width={250} height={250}/>
                    </Link>
                    
                </div>
                <div className='loginbox ml-4 p-7'>
                    <h1 className='text-xl font-bold tracking-wide'>REGISTRATION</h1>
                    <p className='text-xs mt-5'>E-mail</p>
                    <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full mt-2 py-2 pl-12 pr-4 text-gray-500  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />

                    <p className='text-xs mt-5'>PASSWORD</p>
                    <input
                            type="password"
                            placeholder="Password"
                            className="w-full mt-2 py-2 pl-12 pr-4 text-gray-500  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />
                    
                    <p className='text-xs mt-5'>CONFIRM PASSWORD</p>
                    <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full mt-2 py-2 pl-12 pr-4 text-gray-500  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />

                    <p className='text-xs mt-5'>PHONE</p>
                    <input
                            type="number"
                            placeholder="Phone"
                            className="w-full mt-2 py-2 pl-12 pr-4 text-gray-500  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />
                    
                    {/* <p className='text-xs mt-5'>TYPE</p>
                     <P_ComboBox/> */}

                    <div className='buttonBox flex flex-col items-center justify-around'>
                        <button
                            className="transition duration-300 ease-in-out bg-[#F0A500]  text-black-700 font-semibold hover:text-white py-1 px-2 mt-5 border border-none hover:border-transparent shadow-lg">
                            REGISTER
                        </button>
                        <div className='mt-7 flex gap-3 justify-center items-center'>
                        <h1 className="text-sm">Already registered?</h1>
                        <Link href={"./login"}><p className='text-xs underline'>Click Here</p></Link>
                    </div>
                    </div>

                </div>
                </div>
            </div>
            
        </section>
        </>
    )
}
export default register;