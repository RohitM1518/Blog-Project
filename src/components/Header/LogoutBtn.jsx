import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { mdiLogout } from '@mdi/js';


const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler =()=>{
        //most of the thngs in the appwrite returns promise
        authService.logout().then(()=>{
            dispatch(logout())
        })
        //logout will also returns promise therefore we use .then
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 bg-blue-200 text-black hover:bg-blue-100 rounded-full mt-3 ml-7' onClick={logoutHandler}> <span className='mr-2'>
    <svg width='20' height='20' viewBox='0 0 24 24' className='inline-block'>
      <path d={mdiLogout} fill={  'black'}/>
    </svg>
  </span>
      Logout</button>
  )
}

export default LogoutBtn