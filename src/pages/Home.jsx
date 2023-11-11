import React from 'react'
import { useState, useEffect } from 'react'
import Container from '../components/index'
import PostCard from '../components/index'
import appwriteService from '../appwrite/config'

function Home  () {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts.then((post) => {
            if (post) {
                setPosts(post)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py—8 mt-4 text-center">
                <Container>
                    <div className=" flex-wrap">
                        <div className="p-2 w-full">
                            <hl className="text-2xl font—bold O hover: text—gray—5ØØ">
                                Login to read posts
                            </hl>
                        </div>
                    </div>
                </Container>
            </div>

        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex—wrap">
                    {
                        posts.post((post)=>(
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
export default Home;
