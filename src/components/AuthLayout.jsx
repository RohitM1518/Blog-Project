//This file is used to protect route and pages
//This is protected container
//This file used to check user log in status whenever the user navigate from one page to other
//This file usage can be seen only after setting router

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//We can also use AuthLayout as a function name instead of Protected
export default function Protected({children,authentication=true}) 
{
  const navigate = useNavigate();
  const [loader,setLoader] = useState(true);
  const authStatus = useSelector (state => state.auth.status)

  useEffect(()=>{
    // Make it easy
    //auth=false and authstatus =true
    if (authentication && authStatus !== authentication) {
        navigate("/login")
    }
    else if(!authentication && authStatus !==authentication){
        navigate("/")
    }
    setLoader(false)
  },[authStatus, navigate, authentication])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}
