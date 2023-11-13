import React from 'react'
import appwriteService from '../appwrite/config'

import {Link} from 'react-router-dom'
//$id is used because its appwrite syntax
const PostCard = ({$id,title,featureImage,}) => {
  
  return (
    // link does not require url it starts from where it is so we can give /post/${$id}
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 shadow-lg hover:bg-white hover:shadow-2xl'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featureImage)} alt={title} className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard