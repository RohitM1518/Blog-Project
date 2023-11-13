//This is login form and refer React hook form documentation because it is made using React hook form

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { login as storeLogin } from '../store/authSlice'
import  {Input,Logo,Button} from "./index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //below line Explnation can be refered in the react form website in documentation 
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    //data is in form of Object, which is used in the below code as {...register{"email"}}
    const login = async (data) => {
        console.log(data)
        setError("") //clean the error when we start login 

        try {
            //we are using await because we are waiting for the login to complete and the return will be session
            const session = await authService.login(data)
            //if we get session then the user logged in else user not looged in
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(storeLogin(userData));
                    //Link works when you click but navigate works programatically
                    //when user login why we have keep him here itself we have to navigate
                    navigate('/')
                }
            }

        }
        catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className={`mx-auto w-full  max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" textColor='text-black'/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-500 text-center'>{error}</p>}

                {/* handleSubmit is method from appwrite which is handled according to our login function which is passed as the parameter
        
        handleSubmit is actually an  event and used it to manage store on itself*/}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input label='Email:' placeholder='Enter your Email'
                        type='email'
                        // register should be spread and it is syntax and refer chatGpt to understand
                        {...register("email",{
                            required: true,
                            validate:{
                                matchPattern: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",

                                //above not understanding code is called as RegEx(Regular Expression) 
                                //RegEx can be used from Regexr.com
                            }
                        })
                        }/>
                        {/* always use ...register because whenever we use other Input component the register should not be overwritten */}

                        <Input 
                        label='Password'
                        type='password'
                        placeholder="Enter your password"
                        {...register("password",{required:true}) }/>
                        <Button type='submit' className='w-full'>Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login