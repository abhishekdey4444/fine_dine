import { useState,useEffect } from "react"
import { database } from "../firebase/firebase"
import { getDoc, updateDoc, doc, arrayUnion } from "firebase/firestore"
import {FaStar} from "react-icons/fa"

function StarRating({username,res_id,stars}){
    const userId=username
    const rId=res_id
    const [rating,setRating]=useState(stars)
    const [hover,setHover]=useState(null)  
    const [data,setData]=useState()
    const updateRating=(props)=>{
        updateDoc(doc(database,'RESTAURANTS',rId),{
            ratings:arrayUnion({starrating:props,username:userId})
        })
        updateDoc(doc(database,'USERS',userId),{
            rating:arrayUnion({res_id:rId,starrating:props})
        })
        console.log(userId)
        console.log(rId)
    }
    useEffect(()=>{
        getUser()
    },[])
    const getUser=async()=>{
        await getDoc(doc(database,'USERS',userId))
        .then((response)=>{
            setData(response.data().ratings)
            console.log(response.data()['ratings']!==undefined)

        }).catch((err)=>{
            console.error(err)
        })
    }
    
    
    return(
        <>
            {[...Array(5)].map((star,i)=>{
                const ratingValue =i+1;

                return(
                    <label key={i} >
                        <input
                            type="radio"
                            name="rating"
                            className="invisible"
                            value={ratingValue}
                            onClick={()=>{
                                setRating(ratingValue)
                                // if(data['ratings']===NaN){
                                //     updateRating(ratingValue)
                                // }
                            }}
                        />
                        <FaStar className="star" 
                            color={ratingValue<=(hover || rating)?"#ffc107":"#e4e5e9"} 
                            size={70} 
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=>setHover(null)}
                        />
                    </label>
                )
            })}
        </>
    )
}
export default StarRating