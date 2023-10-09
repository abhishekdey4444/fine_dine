import { useRouter } from "next/router"
import { doc, getDoc} from "firebase/firestore"
import { database } from "../../../firebase/firebase"
import { useEffect,useState } from "react"
import Restaurants from "../../../models/restaurants";
import mongoose from "mongoose"
import Script from "next/script";

function booking({restaurants}){
    const router=useRouter()
    const [resData,setResData]=useState()
    const [basicPay,setBasicPay]=useState(0)
    const [gst,setgst]=useState(0)
    const conveniencefee=10
    const [subtotal,setsubtotal]=useState(0)
    const [discount,setdiscount]=useState(0)
    const [grandtotal,setgrandtotal]=useState(0)   
    const [coupon,setcoupon]=useState("")
    const [buttonstate,setbuttonstate]=useState(false)   
    const coupons=["HERO100",'NEW50']
    useEffect(() => {
        if(!router.isReady) return; 
        const {params=[]}=router.query
        console.log(params[0])            
        getData(params[0])
    }, [router.isReady]);

    
    //MAKE PAYMENT -------------------------------> FUNCTION FOR RAZORPAY*********************************
    
    const makePayment = async ({ productId}) => {
        // Make API call to the serverless API
        const data = await fetch("/api/razorpay", {
          method: "POST",
          headers: {
            // Authorization: 'YOUR_AUTH_HERE'
          },
          body: JSON.stringify({ productId })
        }).then(() =>{ 
            res.status(200).end()
        });
        const options = {
          name: data.name,
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          description: data.amountDesc,
          // image: logoBase64,
          handler: function (response) {
            // Validate payment at server - using webhooks is a better idea.
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
            response.status(200).end()
          },
          prefill: {
            name: "John Doe",
            email: "jdoe@example.com",
            contact: "9876543210",
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    
        paymentObject.on("payment.failed", function (response) {
          alert("Payment failed. Please try again. Contact support for help");
          response.status(500).end()
        });
      };



    const calulate =(basicPay)=>{
        setgst((basicPay/100)*28)
        setsubtotal(basicPay+((basicPay/100)*28)+10)
        setgrandtotal((basicPay+((basicPay/100)*28)+10))
    }
    const getData=async(props)=>{
        const databaseRef=doc(database,'RESTAURANTS',props)
        await getDoc(databaseRef)
        .then((response)=>{
            setResData(response.data())
        })
    }
    return (<>
     <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    <div className="bg-[#F0A500] h-fit">
        <h1 className="text-5xl text-white font-bold pt-5 pl-10">Booking Details</h1>
        <div className="flex flex-wrap justify-center gap-20">
            <div className="bg-white w-1/2 mt-10 my-5 shadow-xl">
                <div className="res_header px-5 py-5 flex flex-wrap items-center justify-start">
                    <img className="" src={"/plate.png"} width={80} height={80}/>
                    <div className="flex flex-col items-center-justify-center pl-10">
                         
                        <h1 className="text-4xl font-bold">{restaurants.resName}</h1>
                        <h1 className="italic text-sm text-gray-400">{restaurants.location}</h1>
                        <h1 className="italic text-sm text-gray-400">{restaurants.stars}/5</h1>
                        <h1 className="italic text-xs text-gray-400">Per Person Cost: ₹{restaurants.ppc}</h1>
                        
                    </div>
                </div>
                <hr />
                <div className="flex flex-col px-5 py-5 gap-10">
                    <div className="flex flex-row  justify-even">
                        <label>No of person</label>
                        <input onChange={(e)=>{
                            setBasicPay(e.target.value*restaurants.ppc)
                            calulate(e.target.value*restaurants.ppc)
                        }
                            } className="border ml-5" type="text"></input>
                    </div>
                    <div className="flex flex-wrap">
                        <label>Date</label>
                        <input className="border ml-5" type="date"></input>
                    </div>
                    <div className="flex flex-wrap">
                        <label>Timings</label>
                        <input className="border ml-5" type="time"></input>
                    </div>
                    <div className="flex flex-wrap">
                        <label>Special Requests</label>
                        <textarea className="border ml-5" type="text"></textarea>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center items-center my-5">
                    <button className="px-6 py-2 shadow-xl bg-[#F0A500] text-white text-xl hover:opacity-80" onClick={() => {
                            makePayment({ productId: restaurants._id });}}>
                            Proceed
                    </button>
                </div>
                
            </div>
            <div className="bg-white w-1/4 mt-20 my-5 shadow-xl">
                <h1 className="px-5 pt-5 text-4xl font-bold">Payments Summary</h1>
                {restaurants&&(
                <div className="flex flex-col p-5 justify-start">
                    <div className="flex flex-wrap items-center justify-start gap-5">
                        <h1>Basic Pay:</h1>
                        <h1>{basicPay}</h1>
                    </div>
                    <div className="flex flex-wrap items-center justify-start gap-5">
                        <h1>GST:</h1>
                        <h1>{gst}</h1>
                    </div>
                    <div className="flex flex-wrap items-center justify-start gap-5">
                        <h1>Convenience Fee:</h1>
                        <h1>{conveniencefee}</h1>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex flex-wrap items-center justify-start gap-5">
                        <h1 className="text-xl text-[#A52A2A] font-bold">Subtotal:</h1>
                        <h1>{subtotal}</h1>
                    </div>
                    <div className="flex flex-wrap items-center justify-start gap-5">
                        <h1>Discount:</h1>
                        <h1>{discount}</h1>
                    </div>
                </div>)}
                <hr/>
                <div className="flex flex-col p-5 justify-start gap-5">
                    <h1 className="text-2xl text-[#A52A2A] font-bold">Promo Code</h1>
                    <input onChange={(e)=>setcoupon(e.target.value)} className="border" type="text"/>
                    <button onClick={(e)=>{
                        if(coupons.includes(coupon)){
                            alert("Coupon Valid !")
                            setdiscount(50)
                            setbuttonstate(true)
                        }
                        else{
                            alert("Invalid coupon !")
                        }
                    }} disabled={buttonstate} className="px-2 py-1 bg-gray-200 font-semibold hover:opacity-80">Apply</button>
                </div>
                <hr/>
                <div className="flex flex-wrap p-5 items-center justify-start gap-5">
                    <h1 className="text-3xl text-[#A52A2A] font-bold">Grand total:</h1>
                    <h1>{grandtotal-discount}</h1>
                </div>
            </div>
        </div>
    </div>
    
    </>)
}
export async function getServerSideProps(context){
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.MONGO_URI)
    }
    const {query } =context
    let restaurants=await Restaurants.findById(query.params)
    return {
        props:{restaurants:JSON.parse(JSON.stringify(restaurants))},
    }
}
export default booking
