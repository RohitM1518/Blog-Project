import React from 'react'
import logoImage from './Logo.png'
const Logo = ({textColor='text-white'}) => {
  return (
    <div className='mt-1'>
     {/* <img src={logoImage} alt="Logo" width={50} height={50} /> */}
     <h1 className= {`text-3xl font-semibold font-serif ${textColor}`}>BLOG</h1>
    </div>
  )
}

export default Logo