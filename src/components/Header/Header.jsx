import React from 'react'
import { LogoutBtn, Logo, Container } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { mdiHome, mdiLogin,mdiAccount,mdiNoteEdit,mdiAllInclusive} from '@mdi/js';


const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  //useSelector gives call back

  const navigate = useNavigate();
  //usually using navigate we loop through to the array
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      icon: mdiHome

    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: mdiLogin
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: mdiAccount
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: mdiAllInclusive
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: mdiNoteEdit
    },
  ]
  return (
    <header className='py-2 shadow bg-slate-800 border-white text-white z-20'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
              <h1>Share your thoughts</h1>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) => (
                item.active ? (
                  //Keys are always used where the html elements are repeating
                  <li key={item.name}>
                    {/* below line Explanation: if the authStatus is true then only the things in parantesis will execute */}
                    {/* navigate will simply navigate to the provided slug */}
                    <button onClick={() => navigate(item.slug)}

                      className='inline-block px-6 py-4 duration-200 hover:bg-blue-100 rounded-full'>
                      <span className='mr-2'>
                        <svg width='25' height='25' viewBox='0 0 24 24' className='inline-block mb-1' >
                          <path d={item.icon} fill={item.active ? 'white' : 'white'}/>
                        </svg>
                      </span>
                      {item.name}</button>
                    {/* instead of navigate we can also use Link */}
                  </li>
                ) : null
              ))
            }
            {/* below line Explanation: if the authStatus is true then only the things in parantesis will execute */}
            {authStatus && (
              <li>
               

                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header