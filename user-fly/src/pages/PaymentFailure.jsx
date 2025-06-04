import React from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { toast } from "react-toastify";


const PaymentFailure = () => {
  useEffect(()=>{
      let url = import.meta.env.VITE_BASE_API  + "/profile"
      axios({
        url: url,
        method: "get",
        withCredentials: true,
      })
        .then((res) => {
  
        }).catch((err)=>{
          toast.error("Yor are not authorized");
          navigate('/login')
        })
    },[])
  return (
    <div style={{ margin: '5rem', color: "red", padding: '30px', maxHeight: "30vh" }}>
      <h1>Payment is failed.</h1>
    </div>
  )
}

export default PaymentFailure
