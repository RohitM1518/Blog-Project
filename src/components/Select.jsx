import React, {useId} from 'react'
import { forwardRef } from 'react';

const Select = ({options=[],
label,
className='',
...props
},ref) => {
    const id = useId();
  return (
    <div className='w-full mt-2'>
      {label && <label htmlFor={id} className='font-semibold mr-5 mb-2'>{label} :</label>}
<select ref={ref} className={` ${className}`} id={id} {...props}>
        {/* loop options only if exists(?) else app will crash */}
            { options?.map((option)=>(
                <option key={option} value={option} defaultValue={option==='Only Me'}>
                    {option}
                </option>
            ))

            }
        

</select>
    </div>
  )
}

export default forwardRef(Select)
//other way to use forwardRef