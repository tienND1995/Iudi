import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../images/logoApp.png'

import config from '../../configs/Configs.json'
import { Auth } from '../../service/utils/auth'

import { handleErrorImg } from '../../service/utils/utils'

import { useSelector, useDispatch } from 'react-redux'
import {
 usersSelector,
 fetchProfile,
} from '../../service/redux/users/usersSlice'

const { URL_BASE64 } = config

const Header4 = (props) => {
 const { userName } = new Auth()

 const userState = useSelector(usersSelector)
 const { user, isToggleChangeUser } = userState

 const dispatch = useDispatch()

 useEffect(() => {
  dispatch(fetchProfile(userName))
 }, [isToggleChangeUser])

 return (
  <div className='flex w-full justify-around items-center'>
   <div>
    <img src={Logo} alt='logo' className='w-40' />
   </div>
   <div className='flex'>
    <Link
     to={`/profile/${userName}`}
     className='w-16 h-16 overflow-hidden rounded-[50%]'
    >
     <img
      src={`${URL_BASE64}${user.avatarLink}`}
      alt='avatar'
      className='w-full h-full object-cover'
      onError={(e) => handleErrorImg(e.target)}
     />
    </Link>
   </div>
  </div>
 )
}
export default Header4
