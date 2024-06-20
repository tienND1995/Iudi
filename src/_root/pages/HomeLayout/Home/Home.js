import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../../../images/logoApp.png'

import Header4 from '../../../../components/Header/Header4'
import MenuMobile from '../../../../components/MenuMobile/MenuMobile'
import Background from '../../../../images/Background.png'
import { Auth } from '../../../../service/utils/auth'

import { handleErrorImg } from '../../../../service/utils/utils'
import Chat from '../../../../images/profiles/Chat.png'

import avatarDefault from '../../../../images/avatar-default.jpg'

import { useDispatch, useSelector } from 'react-redux'
import {
 fetchProfile,
 usersSelector,
} from '../../../../service/redux/users/usersSlice'

import config from '../../../../configs/Configs.json'

const { URL_BASE64, IMAGE_PROFILE_PLACEHOLDER } = config

const Home = () => {
 const { userName } = new Auth()

 const userState = useSelector(usersSelector)
 const { user, isToggleChangeUser } = userState
 const { avatarLink, FullName, Bio, CurrentAdd } = user

 const dispatch = useDispatch()

 useEffect(() => {
  dispatch(fetchProfile(userName))
 }, [isToggleChangeUser])

 const avatarRef = useRef()
 const [isErrorImg, setIsErrorImg] = useState(false)

 useEffect(() => {
  avatarRef.current.addEventListener('error', (e) => {
   setIsErrorImg(true)
  })
 }, [])

 return (
  <>
   <div className='mobile:hidden'>
    <div>
     <a href='/' className='block'>
      <img className='mx-auto' src={Logo} alt='logo' />
     </a>
    </div>

    <div className='relative grid grid-cols-2 rounded-[58px] mx-[40px] mt-[30px]'>
     <div className='h-[60vh] ipad:h-[50vh] rounded-tl-[58px] rounded-bl-[58px] overflow-hidden'>
      <img
       className='object-cover object-center w-full h-full'
       src={isErrorImg ? avatarDefault : `${URL_BASE64}${avatarLink}`}
       alt='avatar user'
       ref={avatarRef}
      />
     </div>
     <div className='text-center rounded-tr-[58px] rounded-br-[58px] bg-[#368A69] flex items-center justify-center flex-col'>
      <h2 className='text-[30px] tablet:text-2xl ipad:text-xl font-bold'>
       {FullName}
      </h2>
      <p className='block overflow-hidden w-[100%] text-[20px] tablet:text-lg ipad:text-sm font-bold'>
       {Bio}
      </p>
     </div>
    </div>

    <div className='ipad:flex mt-4 justify-center hidden '>
     <Link to='/message'>
      <img src={Chat} alt='chat' />
     </Link>
    </div>
   </div>

   <div className='bg-[rgba(255,255,255,0)] relative w-full min-h-screen hidden mobile:block'>
    <img src={Background} alt='bg' className='w-full' />
    <div className='absolute top-0 left-0 pt-5 w-full'>
     <Header4 />
    </div>

    <div className='w-full h-full bg-white'>
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
     <MenuMobile />
    </div>
   </div>
  </>
 )
}

export default Home
