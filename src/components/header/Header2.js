import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import config from '../../configs/Configs.json'
import { Auth } from '../shared/Auth'
import { getProfile } from '../shared/getProfile'
import Navbar from './Navbar'

const { AVATAR_DEFAULT_MALE } = config

const Header2 = (props) => {
 const { onGetHeight, isPositionFixed, isDark } = props
 const { userName } = new Auth()

 const [userInfo, setUserInfo] = useState(null)
 const headerRef = useRef()

 useEffect(() => {
  const fetchProfile = async () => {
   const res = await getProfile(userName)
   setUserInfo(res)
  }

  fetchProfile()
 }, [])

 useLayoutEffect(() => {
  onGetHeight && onGetHeight(headerRef?.current.offsetHeight)
 }, [props])

 return (
  <div
   ref={headerRef}
   id='header2'
   className={`${isPositionFixed && 'left-0 right-0 z-10 fixed'} ${
    isDark ? 'bg-black' : 'bg-transparent'
   } flex items-center justify-between text-white border-b border-solid border-b-white overflow-y-auto transition-all duration-200`}
  >
   <div className='flex items-center gap-2'>
    <Link
     to={`/profile/${userName}`}
     className='w-20 h-20 overflow-hidden m-[15px] rounded-[50%]'
    >
     <img
      src={AVATAR_DEFAULT_MALE || userInfo?.avatarLink}
      alt='avatar'
      className='w-full h-full'
     />
    </Link>

    <h3 className='capitalize'>{userName}</h3>
   </div>

   <Navbar />
  </div>
 )
}
export default Header2
