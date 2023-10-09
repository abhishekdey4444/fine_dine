import Head from 'next/head'
import {FcGoogle} from 'react-icons/fc'
import Image from 'next/image'
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {auth} from "../../../firebase/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { app, database } from "../../../firebase/firebase"
import { collection,addDoc, getDoc, getDocs, setDoc, doc,updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

function login(){
    //sign-in with google
    const googleProvider = new GoogleAuthProvider();
    const router=useRouter();
    const [user,loading]=useAuthState(auth);
    const [userData,setUserData]=useState()
    const admins=['abhishekdey4444@gmail.com']

    useEffect(() => {
      let token= sessionStorage.getItem('Token')
      
    }, [])
    

 
    const GoogleLogin = async () =>{
        try {
            const result = await signInWithPopup(auth,googleProvider);
            console.log(result.user);
        } catch (error) {
            console.log(error);
        }

    }
    // ********db_ref for get data***
    
    // const databaseRef= async()=>{await doc(database, 'USERS',user.email)}
    const getData = async ()=>{
        await getDoc(doc(database, 'USERS',user.email))
        .then((response)=>{
            setUserData(response.data())
        })
    }
    // const addData =()=>{
    //     if(user.email==admins[0]){
    //     setDoc(doc(database, 'USERS',user.email),{
    //         username: user.email,
    //         password: user.uid,
    //         admin: true
    //     }).then(()=>{
    //         console.log("data sent->firebase user collection");
    //     }).catch((err)=>{
    //         console.error(err);
    //     })}
    //     else{
    //         setDoc(doc(database, 'USERS',user.email),{
    //             username: user.email,
    //             password: user.uid
    //         }).then(()=>{
    //             console.log("data sent->firebase user collection");
    //         }).catch((err)=>{
    //             console.error(err);
    //         })}
    // }
    
    if(user){
        // addData()
        getData()
        if(user.email==admins[0]){
            router.push("/admin")
        }
        else{router.push('/dashboard')}
    }
    
    
    return (
        <>
        <Head>
            <title>LOGIN | Fine Dine</title>
        </Head>
        <section className='bg-[#F0A500] min-h-screen'>
            <div className='flex flex-wrap items-center justify-around h-screen divide-x-2'>
                <div className='flex flex-wrap bg-white justify-around shadow-2xl p-20'>
                <div className='img  m-5 p-10'>
                    <Link href={"/"}>
                        <Image src={"/plate.png"} alt="NA" width={200} height={200}/>
                    </Link>
                    
                </div>
                <div className='loginbox ml-4 p-10'>
                    <h1 className='text-xl font-bold tracking-wide'>LOGIN</h1>
                    <p className='text-xs mt-5'>USERNAME</p>
                    <input
                            type="text"
                            placeholder="USERNAME"
                            className="w-full mt-2 py-2 pl-12 pr-4 text-gray-500  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />

                    <p className='text-xs mt-5'>PASSWORD</p>
                    <input
                            type="password"
                            placeholder="PASSWORD"
                            className="w-full mt-2 py-2 pl-12 pr-4 text-gray-500  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                        />
                    <div className='buttonBox flex flex-wrap items-center justify-around'>
                        <button
                            className="transition duration-300 ease-in-out bg-[#F0A500]  text-black-700 font-semibold hover:text-white py-1 px-2 mt-5 border border-none hover:border-transparent shadow-lg">
                            LOGIN
                        </button>

                        <button onClick={event=>{GoogleLogin();}}
                            className="transition duration-300 ease-in-out bg-white shadow-lg border text-black-700 font-semibold hover:bg-gray-100 py-1 px-2 mt-5 border border-none hover:border-transparent flex justify-center items-center gap-2">
                                <FcGoogle/>
                            Google
                        </button>

                    </div>

                   <div className='mt-10 flex gap-3 justify-center items-center'>
                        <h1 className="text-sm">Not yet registered?</h1>
                        <Link href={"./registration"}><p className='text-xs underline'>Click Here</p></Link>
                    </div> 
                    
                </div>
                </div>
            </div>
            
        </section>
        </>
    )
}

export default login;