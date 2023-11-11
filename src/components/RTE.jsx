//This is TextEditor file, refer mcetiny rte documentation 
//About Controller refer react hook form documentation
//We can also use forwardRef but in this we used different approach called Controller
import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

//control in props comes from react hook form and this responsible to manage the state
export default function RTE ({name,control, label,defaultValue='' }) {
  return (
    <div className='w-full'>
        {
        label && <label className='inline-block mb-1 pl-1 '>{label}</label>
        }
        {
            //control is used to register the input
            //name is used to identify the input
            //defaultValue is used to set initial value of input
            
        }
        <Controller 
        name={name || 'content'}
        control={control} //This line gives control to parent(PostForm.jsx) that is passing control as prop
        render={({field: {onChange}})=>{ // if there is change  in the field render Editor
            return (
                <Editor
                initialValue={defaultValue}
                init={{
                    initialValue:defaultValue,
                    branding: false,
                    height:500,
                    menubar: true,
                    plugins:[
                        "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                    ],
                    toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            
                }}
                onEditorChange={onChange} //if there is any change in Editor, render
                />
            )
        }}
        />

    {/* <Editor
    initialValue='default Value'
    init={
        {
            branding: false,
            height:500,
            menubar: false,
            plugins:[
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }
    }
    /> */}
    </div>
  )
}
