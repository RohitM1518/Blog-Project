import React from 'react'
import LogoutBtn from './LogoutBtn'
import Logo from '../index'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state)=>state.auth.status)
//useSelector gives call back

const navigate = useNavigate();
//usually using navigate we loop through to the array
const navItems =[
  {
    name: 'Home',
    url: "/",
    active: true
  }, 
  {
    name: "Login",
    url: "/login",
    active: !authStatus,
},
{
    name: "Signup",
    url: "/signup",
    active: !authStatus,
},
{
    name: "All Posts",
    url: "/all-posts",
    active: authStatus,
},
{
    name: "Add Post",
    url: "/add-post",
    active: authStatus,
},
]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
            <ul className='flex ml-auto'>
              {
                navItems.map((item)=>(
                  item.active ? (
                    //Keys are always used where the html elements are repeating
                    <li key={item.name}>
                      {/* below line Explanation: if the authStatus is true then only the things in parantesis will execute */}
                      {/* navigate will simply navigate to the provided url */}
                      <button onClick={()=> navigate(item.url)}
                      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                      {/* instead of navigate we can also use Link */}
                    </li>
                  ):null
                ))
              }
              {/* below line Explanation: if the authStatus is true then only the things in parantesis will execute */}
              {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header