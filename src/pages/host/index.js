import { useState,useEffect } from "react"
import { database,auth } from "../../../firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { updateDoc,getDoc,doc,setDoc, FieldValue,arrayUnion } from "firebase/firestore"
import { useRouter } from "next/router"
function host(){
    const [user,loading]= useAuthState(auth)
    const [checked,setChecked]=useState(false)
    const [userData,setUserData]=useState()
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const router=useRouter()
    var date=new Date()
    const handleChange=()=>{
        setChecked(!checked)
    }
    
    
    const addReq =()=>{
        setDoc(doc(database, 'ADMINS','hostReq'),{
            hostQueue:arrayUnion({
                hostName:user.displayName,
                hostUsername:user.email,
                userId:user.uid
            })
        })
        .then(()=>{
            console.log("data sent->firebase user collection");
            addToQueue()
        }).catch((err)=>{
            console.error(err);
        })
    }
    const addQueue=()=>{
        const docRef=doc(database,'USERS',user.email)
        updateDoc(docRef,{
            hostqueue:true
        })
    }

    const addToQueue =()=>{
        setDoc(doc(database,'ADMINS','hostQueue'),{
            readyQueue:arrayUnion({
                hostName:user.displayName,
                hostUsername:user.email,
                userId:user.uid
            })
        }).then(()=>{
            console.log("host---->added to dataQueue")
        }).catch((err)=>{
            console.error(err);
        })
    }
        
    
    const getData=async()=>{
        const docRef=doc(database,'USERS',user.email)
        await getDoc(docRef)
        .then((response)=>{
            setUserData(response.data())
            console.log(response.data())
        }).catch((err)=>{
            console.error(err)
        })
    }
    const addData=()=>{
        const docRef=doc(database,'HOSTS',user.email)
        setDoc(docRef,{
            name:user.displayName,
            username:user.email,
            restaurants:[],
            bookings:[],
            phone:99999999999,
            officePhone:99999999999,
            officeEmail:'',
            gstId:'',
            panId:'',
            aadharId:99999999999,
        })
    }

    const acceptHost=(username)=>{
        updateDoc(doc(database,'USERS',user.email),{
            host:true
        })
    }
    const hostApply=()=>{
        console.log(checked)
        if(checked && user){
            // addReq()
            // addData()
            // addQueue()
            acceptHost()
            router.push("/dashboard")
        }
        // if(userData.hostqueue==true){
        //     window.alert("Already applied, wait for admin's approval.")
        // }
        else{
            window.alert("Please click on the checkbox to agree the terms and conditions.")
        }
    }
    // if(!user) router.back()
    if(user){
        getData()
        if(userData&&userData.host===true){
            router.push("/host/dashboard")
        }
    }
    return(
        <>
        <div className="h-screen">
            <div className="flex flex-wrap items-center justify-center gap-2 pt-10">
                <h1 className="text-center text-6xl font-bold">Join Us -</h1>
                <h1 className="text-[#DC143C] text-center text-6xl font-bold">Become a Host.</h1>
            </div>

            <div className="flex flex-wrap items-center justify-center">
                <h1 className="text-4xl mt-5">Terms & Conditions</h1>
            </div>

            <div className="flex flex-wrap  justify-center pt-5 px-80 ">
                <div className="overflow-auto h-96 mt-5 bg-gray-100">
                    {user&&<p className="p-5">
                    This Host Agreement ("Agreement") is made and entered into between the undersigned host ("{user.displayName}") and the restaurant booking website "Fine Dine" on this {date.getDate()} day of {month[date.getMonth()]}, 2023.<br/><br/><br/>

1.Host Responsibilities: Host agrees to make available a designated number of tables or seating arrangements at their restaurant for reservations made through the Website. Host shall ensure that the tables are clean, well-maintained, and available during the agreed-upon reservation times. Host shall provide accurate and complete information about the restaurant, including but not limited to, the cuisine, availability, pricing, and special requirements.
<br/><br/>
2.Reservations and Payments: Host agrees to honor all reservations made through the Website and to provide the designated tables and services as described on the Website. Host shall receive payments for reservations through the Website in accordance with the agreed-upon pricing, payment terms, and payment schedule. Host acknowledges that the Website may charge fees or commissions for its services.
<br/><br/>
3.Guest Communication and Support: Host agrees to promptly confirm and communicate with guests regarding their reservations, including providing confirmation details, any special instructions, and addressing any inquiries or requests. Host shall provide necessary assistance to guests during their dining experience, including but not limited to, seating arrangements, menu information, and service quality. Host shall report any issues or incidents involving guests or the dining experience to the Website immediately.
<br/><br/>
4.Compliance with Laws: Host agrees to comply with all applicable laws, regulations, and requirements, including but not limited to, health and safety regulations, food safety laws, and licensing requirements. Host shall maintain any required permits, licenses, or approvals for restaurant operations, and shall provide proof of compliance upon request by the Website.
<br/><br/>
5.Liability and Insurance: Host acknowledges that the Website does not provide any insurance coverage for Host's restaurant or activities. Host agrees to maintain appropriate insurance coverage, including but not limited to, liability insurance, property insurance, and workers' compensation insurance, to protect against any loss, damage, or liability arising from hosting activities. Host shall indemnify and hold the Website harmless from any claims, damages, losses, or expenses arising from Host's breach of this Agreement or hosting activities.
<br/><br/>
6.Termination: Either party may terminate this Agreement with written notice to the other party. Host acknowledges that termination of this Agreement may result in cancellation of pending reservations and removal of the restaurant from the Website. Host shall fulfill all obligations to guests for confirmed reservations, even after termination of this Agreement.
<br/><br/>
7.Confidentiality: Host agrees to keep all confidential information obtained from the Website or guests confidential and not to disclose, share, or use such information for any purpose other than fulfilling the obligations under this Agreement.
<br/><br/>
8.Entire Agreement: This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements, understandings, and communications, whether written or oral, relating to the subject matter hereof.
<br/><br/>
9.Governing Law and Jurisdiction: This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction where the restaurant is located. Any disputes arising out of or in connection with this Agreement shall be resolved through negotiation in good faith, and if not resolved, shall be subject to the exclusive jurisdiction of the courts of the jurisdiction where the restaurant is located.
<br/><br/>
10.Amendment and Waiver: This Agreement may not be amended or modified except in writing signed by both parties. The failure of either party to enforce any provision of this Agreement shall not be deemed a waiver of that provision or any other provision of this Agreement.
<br/><br/>
IN WITNESS WHEREOF, the parties have executed this Host Agreement as of the date first above written.
<br/><br/>
Host: {user.displayName}
<br/><br/>
Fine Dine
                    </p>}
                </div>
            </div>

            <div className="flex flex-wrap mt-10 items-center justify-center gap-1">
                <input 
                    type={"checkbox"}
                    checked={checked}
                    onChange={handleChange}

                />
                <h1 className="text-xs"> I agree to the Terms and Conditions</h1>
            </div>
            <div className="flex flex-wrap items-center justify-center">
                    <button className=" ml-5 mt-5 mb-5 transition duration-300 ease-in-out bg-[#DC143C]  text-white font-bold  hover:opacity-80 py-1 px-3 border border-none shadow-xl"
                        onClick={() =>{hostApply()} }>AGREE</button>
            </div>
        </div>
        </>
    )
}
export default host