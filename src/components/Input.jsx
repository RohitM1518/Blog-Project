//This file is for Input feild component
import React, {useId}from 'react'

//function Input is a callback
//forwardRef helps to manage state and passes ref as prop, study using chatGPT
//ref can be passed to parent component(Eg: Form) and also parent can access state 
const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className ='',
    ...props
},ref){
    const id = useId();
    return (
      <div className='w-full'>
        {/* if label exists then we display label tag */}
        {label && <label className='inline-block pl-1 mb-1' htmlFor={id}>
            {label}
            </label>
        }
        {/* to access user passed classNames we have to use using backticks */}
        <input type={type} 
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}
        ref={ref}
        {...props}
        id={id}
         />

      </div>
    )
}) 
   
  

export default Input