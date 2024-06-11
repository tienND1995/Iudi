import { Button, IconButton } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { slugString } from '../shared/slugString'

import { Auth } from '../../components/shared/Auth'

const Navbar = () => {
 const { isLogin, userName } = new Auth()
 const navigate = useNavigate()
 const [openNav, setOpenNav] = useState(false)

 const [groupFirst, setGroupFirst] = useState({})
 const [isGetGroupFirst, setIsGetGroupFirst] = useState(false)

 useEffect(() => {
  const fetchGroups = async () => {
   try {
    const response = await axios.get(
     'https://api.iudi.xyz/api/forum/group/all_group'
    )
    setGroupFirst(response.data.data[0])
    setIsGetGroupFirst(true)
   } catch (error) {
    console.error('Error fetching data:', error)
   }
  }
  fetchGroups()
 }, [])

 const { GroupName, GroupID } = groupFirst

 const navList = [
  {
   name: 'Home',
   link: '/',
   id: 1,
  },

  {
   name: 'Profile',
   link: `/profile/${userName}`,
   id: 3,
  },

  isGetGroupFirst && {
   name: 'Group',
   id: 4,
   link: `/group/${slugString(GroupName)}/${GroupID}`,
  },
 ]

 useEffect(() => {
  window.addEventListener(
   'resize',
   () => window.innerWidth >= 960 && setOpenNav(false)
  )
 }, [])

 const handleLogout = () => {
  if (window.confirm('Are you sure ?')) {
   localStorage.clear()
   window.location.href = 'http://localhost:3000/'
  }
 }
 return (
  <div className='flex items-center gap-4 '>
   <div className='hidden mr-4 lg:block'>
    <ul className='flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
     {navList.map(({ name, link, id }) => (
      <li key={id}>
       <Link className='p-1 font-normal' to={link}>
        {name}
       </Link>
      </li>
     ))}

     {isLogin && (
      <li>
       <p>Chào mừng {userName}</p>
      </li>
     )}
    </ul>
   </div>
   <div className='flex items-center gap-x-1'>
    {!isLogin ? (
     <Button
      variant='text-white'
      size='sm'
      className='hidden mr-4 lg:inline-block'
      onClick={() => navigate('/login')}
     >
      <span>Log In</span>
     </Button>
    ) : (
     <Button
      variant='text-white'
      size='sm'
      className='hidden mr-4 lg:inline-block'
      onClick={handleLogout}
     >
      <span>Log Out</span>
     </Button>
    )}

    {!isLogin && (
     <Button
      variant='gradient'
      size='sm'
      className='hidden mr-4 lg:inline-block'
      onClick={() => navigate('/register')}
     >
      <span>Sign up</span>
     </Button>
    )}
   </div>
   <IconButton
    variant='text'
    className='w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
    ripple={false}
    onClick={() => setOpenNav(!openNav)}
   >
    {openNav ? (
     <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className='w-6 h-6'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
     >
      <path
       strokeLinecap='round'
       strokeLinejoin='round'
       d='M6 18L18 6M6 6l12 12'
      />
     </svg>
    ) : (
     <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 h-6'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
     >
      <path
       strokeLinecap='round'
       strokeLinejoin='round'
       d='M4 6h16M4 12h16M4 18h16'
      />
     </svg>
    )}
   </IconButton>
  </div>
 )
}

export default Navbar
