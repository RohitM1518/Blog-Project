import React from 'react'
//container contains height weight and other styling properties and displays whatever it is having as it is
const Container = ({children}) => {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}
export default Container