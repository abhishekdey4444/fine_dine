import { useRouter } from "next/router";
import Carousel from "../src/pages/carousel"
import { useState } from "react"
import Trending from "../src/pages/trending"


function mainContent(){
    const router=useRouter();
    // console.log(restaurants)
    return (
        <>
        <div className="h-screen flex flex-col items-center justify-center">
            <div>
                <h1 className="text-8xl font-bold py-10 px-5">Wanna dine-in?</h1>
                <div className="flex flex-wrap">
                    <h1 className="text-6xl font-bold px-5">Let's make it a</h1>
                    <h1 className="text-6xl font-bold text-[#F0A500]">Fine Dine.</h1>
                </div>
            </div>
            <div>
                <button onClick={(e)=>{
                    router.push("/restaurant");
                }} className="mt-10 px-8 py-4 text-white hover:opacity-80 bg-[#F0A500]">Dine-In</button>
            </div>
        </div>
        <div className="h-27 my-20" id="trending">
                <h1 className="my-10 text-3xl font-bold ml-5">Trending</h1>
                <iframe src="/trending" className="w-full h-full px-5 my-5"></iframe>
        </div>
        <br></br>
        <div className="h-26 my-20" id="top">
            <h1 className="my-10 text-3xl font-bold ml-5">Top</h1>
            <iframe src="/top" className="w-full h-full px-5 my-5"></iframe>
        </div>
        
        </>
    )
}

export default mainContent