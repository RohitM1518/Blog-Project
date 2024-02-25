
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
//react redux provides bridge between react and the redux
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice'
import {Header,Footer} from './components';
import {Outlet} from 'react-router-dom';


function App() {
  const[loading,setLoading]=useState(true); //used to show loading if the website still have not loaded else the website will be shown
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    // the .then() and .finally() methods should be used with function callbacks.
    .then((userData)=>{
  if (userData) {
    dispatch(login({userData}));
  } else {
     dispatch(logout());
  }
  })
    .finally(()=>{
          setLoading(false);
    })
    //finally will run no matter if the then runs or not but finally runs
  },[]);

  //conditional return rather than the traditional one
  return !loading ?(
    <>
     {/* <div className='bg-slate-100 max-sm:flex-col'>
      <div className='w-fit'> */}
        <Header />
        <main className=' mt-11'>
          {/* <Outlet />  this comes from react router dom */}
          <Outlet />
        </main>
        <Footer />
      {/* </div>
    </div> */}
    </>
  ) : null
}

export default App
