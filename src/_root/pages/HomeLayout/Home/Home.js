import React, { useEffect, useState, useRef } from 'react'
import Logo from '../../../../images/logoApp.png'

import avatar from '../../../../images/icons/avatar-demo.png'

import axios from 'axios'
import { Auth } from '../../../../service/utils/auth'
import Background from '../../../../images/Background.png'
import Header4 from '../../../../components/Header/Header4'
import MenuMobile from '../../../../components/MenuMobile/MenuMobile'

import { handleErrorImg } from '../../../../service/utils/utils'

import { useSelector, useDispatch } from 'react-redux'
import {
 usersSelector,
 fetchProfile,
} from '../../../../service/redux/users/usersSlice'

import config from '../../../../configs/Configs.json'

const { URL_BASE64 } = config

const Home = () => {
 const { userName } = new Auth()

 const [profileData, setProfileData] = useState({})

 const userState = useSelector(usersSelector)
 const { user, isToggleChangeUser } = userState
 const { avatarLink, FullName, Bio, CurrentAdd } = user

 const dispatch = useDispatch()

 useEffect(() => {
  dispatch(fetchProfile(userName))
 }, [isToggleChangeUser])

 const avatarRef = useRef()

 return (
  <>
   <div className='hidden sm:block'>
    <div>
     <a href='/' className='block'>
      <img className='mx-auto' src={Logo} alt='logo' />
     </a>
    </div>

    <div className='relative grid grid-cols-2 rounded-[58px] mx-[40px] mt-[30px]'>
     <div className='h-[60vh] rounded-tl-[58px] rounded-bl-[58px] overflow-hidden'>
      <img
       className='object-cover object-center w-full h-full'
       src={`${URL_BASE64}${avatarLink}`}
       alt='avatar user'
       onError={() => handleErrorImg(avatarRef)}
        ref={avatarRef}
      />
     </div>
     <div className='rounded-tr-[58px] rounded-br-[58px] bg-[#368A69] flex items-center justify-center flex-col'>
      <h2 className='name'>{FullName}</h2>
      <p className='block overflow-hidden w-[100%]'>{Bio}</p>
     </div>
    </div>
   </div>

   <div className='items-center bg-[rgba(255,255,255,0)] w-full h-full sm:hidden'>
    <img src={Background} alt='bg' className='w-full' />
    <div className='absolute top-0 left-0 pt-5 w-full'>
     <Header4 />
    </div>
    <div className='relative w-full h-full bg-white'>
     <div className='absolute border-solid border-[5px] w-[90%] h-[450px] z-20 bg-white -mt-48 rounded-[30px] left-1/2 transform -translate-x-1/2 shadow-lg p-2'>
      <div className='w-full h-full rounded-[30px] overflow-hidden'>
       <img
        className='object-cover w-full h-full rounded-lg'
        src={`${URL_BASE64}${avatarLink}`}
        alt='avatar user'
        onError={() => handleErrorImg(avatarRef)}
        ref={avatarRef}
       />
       <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center p-4 pb-5'>
        <h2 className='text-white text-4xl font-semibold'>{FullName}</h2>
        <p className='text-white text-3xl font-semibold opacity-80'>
         {CurrentAdd}
        </p>
       </div>
      </div>
     </div>
     <div className='absolute border-solid border-[5px] w-[80%] h-[465px] z-10 bg-white -mt-48 left-1/2 transform -translate-x-1/2 rounded-[20px] shadow-md'></div>
     <div className='absolute border-slate-500 border-[5px] w-[70%] h-[480px] z-0 bg-white -mt-48 left-1/2 transform -translate-x-1/2 rounded-[20px] shadow-sm'></div>

     {/* Mobile menu */}
     <div className='fixed bottom-14 left-0 right-0 mx-3'>
      <MenuMobile />
     </div>
    </div>
   </div>
  </>
 )
}

export default Home
