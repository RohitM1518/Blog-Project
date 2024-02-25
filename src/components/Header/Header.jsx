import React,{useState,useRef,useEffect} from 'react'
import { LogoutBtn, Logo, Container } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate,NavLink } from 'react-router-dom'
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

  // const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    


  //   const toggleMobileMenu = () => {
  //       setMobileMenuOpen(!isMobileMenuOpen);
  //   };

  //   const mobileMenuRef = useRef(null);

  //   useEffect(() => {
  //       const handleOutsideClick = (event) => {
  //           if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
  //               setMobileMenuOpen(false);
  //           }
  //       };

  //       document.addEventListener('click', handleOutsideClick);

  //       return () => {
  //           document.removeEventListener('click', handleOutsideClick);
  //       };
  //   }, [mobileMenuRef]);
  return (
    <header className='py-2 shadow bg-neutral-800 border-white text-white z-20'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
              <h1 className=' max-sm:hidden'>Share your thoughts</h1>
            </Link>
          </div>
          <ul className='flex ml-auto mt-2 max-sm:hidden'>
            {
              navItems.map((item) => (
                item.active ? (
                  //Keys are always used where the html elements are repeating
                  <li key={item.name} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 '>
                    {/* below line Explanation: if the authStatus is true then only the things in parantesis will execute */}
                    {/* navigate will simply navigate to the provided slug */}
                    <button onClick={() => navigate(item.slug)}

                      className='inline-block px-6 py-4 duration-200 rounded-full'>
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
          {/* <div className='lg:hidden'>
                    <button className='text-2xl' onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? '⛌' : '☰'}
                    </button>
                </div> */}
                {/* Display the mobile menu items vertically when the mobile menu is open
                {true && (
                    <div className='lg:hidden absolute top-full left-0 w-full bg-white'>
                        <ul className='flex flex-col p-4 gap-1'>
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        className='text-black opacity-50 hover:text-emerald-600 transition duration-300'
                                       // activeClassName='text-emerald-600 opacity-95'
                                        onClick={toggleMobileMenu}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
        </nav>
      </Container>
    </header>
  )
}

export default Header