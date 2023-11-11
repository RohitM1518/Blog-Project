//Manages RTE.jsx

import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'
import RTE from '../RTE'    
import Select from '../Select'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService from '../../appwrite/auth'

const PostForm = ({ post }) => {
    //useForm gives many things
    //watch is for continuous monitoring
    //setValue is to set value in form
    //control is used to get control of the form(RTE.jsx)
    //get values to get form values
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            //if user clicks edit on post the the title will be taken for title variable
            //if user creates new post the title will empty initally
            //similar approach to remainings slug,content,status
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })
    const navigate = useNavigate();
    const userData = useSelector(state => state.userData)

    //submit check whether the post need to be updated or to be created new
    const onSubmit = async (data) => {
    
        //if post exists that means user asking for updation
        if (post) {
            //below code is to update by uploading new image and other details
            const file = data.images[0] ? authService.uploadFile(data.image[0]) : null
            
            //below  code is to delete existing image
            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            //below code is for updating post where we need to pass slug and object
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            }
            )
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        //else it means user wants to create a new post
        else
        {
            //below code is to add images and other details
            const file = data.images[0] ? authService.uploadFile(data.image[0]) : null
            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.createPost
            ({
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
        }
}

//slugTranform transforms spaces in the plain text to dash
//useCallback also have dependency array
const slugTransform = useCallback((value)=>{
    if(value && typeof value === 'string')
        return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g,'-')
        .replace(/\s/g,'-')
    return ''

},[])

//below code is used to sluTransform
useEffect(()=>{
    const subscription = watch((value,{name})=>{
        if(name === 'title'){
            setValue('slug',slugTransform(value.title,{shouldValidate:true}))
        }
    })

    return () => {
        //This is used for optimization which will relocate the memory
        subscription.unsubscribe()
    }
},[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
    )
}

export default PostForm