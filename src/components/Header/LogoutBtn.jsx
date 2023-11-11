import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'


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
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn