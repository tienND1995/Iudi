import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
 ChatBubbleOvalLeftEllipsisIcon,
 ClockIcon,
 Cog6ToothIcon,
 GlobeAltIcon,
 HomeIcon,
} from '@heroicons/react/24/outline'
import { Auth } from '../../service/utils/auth'

const MenuMobile = () => {
 const { userName } = new Auth()

 const icons = [
  {
   id: 1,
   icon: HomeIcon,
   link: '/',
   isLink: true,
  },
  {
   id: 2,
   icon: GlobeAltIcon,
   link: '',
   isLink: true,
  },
  {
   id: 3,
   icon: ClockIcon,
   link: '',
   isLink: true,
  },
  {
   id: 4,
   icon: ChatBubbleOvalLeftEllipsisIcon,
   link: '/message',
   isLink: true,
  },
  {
   id: 5,
   icon: Cog6ToothIcon,
   link: `/profile/${userName}`,
   isLink: true,
  },
 ]

 const location = useLocation()
 const [activeLink, setActiveLink] = useState(location.pathname)

 useEffect(() => {
  setActiveLink(location.pathname)
 }, [location])

 return (
  <div className='hidden mobile:block absolute bottom-5 left-1/2 -translate-x-1/2 w-full px-3'>
   <ul className='flex border border-solid border-gray-400 justify-around p-5 rounded-[55px]'>
    {icons.map(({ icon: Icon, link, isLink, id }) => {
     const isActive = activeLink === link
     return isLink ? (
      <li key={id}>
       <Link to={link} onClick={() => setActiveLink(link)}>
        <Icon
         className={`h-10 w-10 ${
          isActive ? 'text-[#008748]' : 'text-[#989394]'
         }`}
        />
       </Link>
      </li>
     ) : (
      <li key={id}>
       <Icon
        className={`h-10 w-10 ${
         isActive ? 'text-[#008748]' : 'text-[#989394]'
        }`}
       />
      </li>
     )
    })}
   </ul>
  </div>
 )
}

export default MenuMobile
