import React, {useId} from 'react'

const Select = ({options=[],
label,
className='',
...props
},ref) => {
    const id = useId();
  return (
    <div className='w-full'>{label && <label htmlFor={id} className=''></label>}
<select ref={ref} className={` ${className}`} id={id} {...props}>
        {/* loop options only if exists(?) else app will crash */}
            { options?.map((option)=>{
                <option key={option} value={option}>
                    {option}
                </option>
            })

            }
        

</select>
    </div>
  )
}

export default React.forwardRef(Select)
//other way to use forwardRef