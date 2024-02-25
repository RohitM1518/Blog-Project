import React from 'react'
import { useState, useEffect } from 'react'
import { Container, PostCard,Button } from '../components/index'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, [])

    if (authStatus === false) {
        return (<>
        {/* <div className='flex w-full justify-center'>
            <hl className="text-2xl font—bold text-red-500 font-serif hover:text—gray—00">
                Login to read posts
            </hl>
            </div> */}
            <section id="home" className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container">
                <div className="relative xl:w-2/5 justify-center items-start w-full">
                
                    <h1 className="font-palanquin text-7xl leading-[90px] max-sm:text-[62px] font-semibold text-center">
                        <span className="xl:bg-slate-100 xl:whitespace-nowrap relative z-10 pl-2 pr-10 ">Every post is a new </span>
                        <br className=' max-sm:hidden'/>
                        <span className="xl:whitespace-nowrap relative z-10 mt-20 pr-10 font-bold ml-20 ">Adventure </span>
                        <br />
                        <span className="xl:bg-slate-100 xl:whitespace-nowrap relative z-10 pl-5 pr-10">to be Explored...</span>
                        <br />
                    </h1>

                    <p className="font-montserrat text-slate-gray text-lg leading-8 ml-5 mt-6 mb-6 sm:max-w-sm">Welcome to our sanctuary of words, a space where inspiration takes flight. With each post, we invite you to embark on a journey of thoughts and discoveries.</p>
                    <p className="text-xl font-montserrat text-coral-red  ml-5 font-semibold mb-3">Login to read posts</p>
                    <button  onClick={()=>navigate("/login")} className='bg-slate-800 text-white p-2 px-5 rounded-lg ml-5 hover:bg-white hover:text-black'>Login</button> 
        
                </div>

                <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
                
                </div>
            </section>
        </>

        )
    }

    return (
        <>
        {/* <div className='flex w-full justify-center'>
            <hl className="text-2xl font—bold text-red-500 font-serif hover:text—gray—00">
                Login to read posts
            </hl>
            </div> */}
            <section id="home" className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-20 max-container mt-[-45px]">
                <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x">
                   
                    <h1 className="font-palanquin text-7xl leading-[90px] max-sm:text-[62px] max-sm:leading-[72px] font-semibold">
                        <span className="xl:bg-slate-100 xl:whitespace-nowrap relative z-10 pl-2 pr-10">Every post is a new </span>
                        <br />
                        <span className="xl:whitespace-nowrap relative z-10 mt-20 pr-10 font-bold ml-20">Adventure </span>
                        <br />
                        <span className="xl:bg-slate-100 xl:whitespace-nowrap relative z-10 pl-5 pr-10">to be Explored...</span>
                        <br />
                    
                        
                    </h1>
                    <p className="font-montserrat text-slate-gray text-lg leading-8 ml-5 mt-6 mb-6 sm:max-w-sm">Welcome to our sanctuary of words, a space where inspiration takes flight. With each post, we invite you to embark on a journey of thoughts and discoveries.</p>
                    <p className="text-xl font-montserrat text-coral-red  ml-5 font-semibold mb-3">Check all posts</p>
                    <button  onClick={()=>navigate("/all-posts")} className='bg-slate-800 text-white p-2 px-5 rounded-lg ml-5 hover:bg-white hover:text-black'>All Posts</button> 
                    
                    {/* <div className="flex justify-starts items-start flex-wrap w-full mt-20 gap-16 ">
          {statistics.map((stat, index)=>(
            <div key={index}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
             <p className="leading-7 font-montserrat ">{stat.label}</p>
            </div>
          ))}
        </div> */}
                </div>

                <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center ml-20">
                    
                <Container>
                <div className="flex flex-row flex-wrap border-l border-t border-b border-black mt-60">
                    <div className=''>
                    <p className='font-xl '>Recent Posts</p>
                    </div>
                    <div className="flex flex-row flex-wrap">
                    { 
                        
                        posts.slice(0,4).map((post) => (
                            
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                            
                        
                        ))
                    }
                    </div>
                </div>
            </Container>
                </div>
            </section>
        </>
    )
}
export default Home;
