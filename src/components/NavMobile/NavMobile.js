import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { AiFillMessage } from 'react-icons/ai'
import { FaPeopleGroup } from 'react-icons/fa6'
import { GoHome } from 'react-icons/go'
import { IoSettingsOutline } from 'react-icons/io5'
import { LiaCompassSolid } from 'react-icons/lia'

const NavMobile = () => {
 const navList = [
  {
   id: 1,
   icon: <GoHome />,
   link: '/',
  },
  {
   id: 2,
   icon: <LiaCompassSolid />,
   link: '/finding',
  },
  {
   id: 3,
   icon: <FaPeopleGroup />,
   link: '/group',
  },
  {
   id: 4,
   icon: <AiFillMessage />,
   link: '/message',
  },
  {
   id: 5,
   icon: <IoSettingsOutline />,
   link: `/setting`,
  },
 ]

 const { pathname } = useLocation()

 return (
  <div className='fixed rounded-xl bottom-0 left-0 hidden mobile:block bg-white w-full '>
   <nav className='px-3'>
    <ul
     className={`h-[70px] flex items-center justify-evenly ${
      pathname === '/' && 'border-[#0000001A] border rounded-[40px]'
     }`}

    >
     {navList.map(({ id, icon, link }) => (
      <li key={id} className='text-2xl text-[#989394]'>
       <NavLink
        className={({ isActive }) => (isActive ? 'text-[#008748]' : '')}
        to={link}
       >
        {icon}
       </NavLink>
      </li>
     ))}
    </ul>
   </nav>

   <div className='w-[35%] h-[5px] bg-black rounded-sm mx-auto my-3'></div>
  </div>
 )
}

export default NavMobile
