import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


import appstore from '../images/appstore.png'
import chplay from '../images/chplay.png'
import Logo from '../images/logoApp.png'

import Header1 from '../components/Header/Header1'
import background from '../images/background.jpg'

import Line from '../components/shared/Line'
import { Auth } from '../service/utils/auth'

const AuthLayout = () => {
 const { isLogin } = new Auth()

 if (isLogin) return <Navigate to='/' />

 const circleLeft = {
  width: '100%',
  height: '100%',
  clipPath: 'circle(70% at 25% 0%)',
  background: '#008748B2',
 }

 const circleRight = {
  width: '100%',
  height: '100%',
  clipPath: 'circle(38% at 93% 15%)',
  background: 'rgba(20, 145, 87, .9)',
  position: 'absolute',
  top: '0',
  right: '0',
 }

 return (
  <>
   <section
    className=' flex flex-col justify-between w-full min-h-screen mobile:hidden'
    style={{ background: `no-repeat center/cover url(${background})` }}
   >
    <Header1 />
    <div className='flex flex-col justify-center items-center mt-[100px] relative top-[-150px]'>
     <img src={Logo} alt='Your' className='w-[400px] tablet:w-[200px]' />
     <h1 className='font-bold text-white text-7xl ipad:text-4xl tablet:text-4xl'>
      Kết Nối Yêu Thương
     </h1>
     <div className='flex justify-center items-center mt-[30px]'>
      <a href='#' className=''>
       <img src={appstore} alt='appstore' className='w-[200px]' />
      </a>
      <a href='#' className=''>
       <img src={chplay} alt='chplay' className='w-[230px] h-[100px]' />
      </a>
     </div>
    </div>
    <Outlet />
   </section>

   <section className='mobile:flex flex-col hidden font-roboto min-h-screen w-full relative'>
    <div className='h-[33vh] relative'>
     <div style={circleLeft}></div>
     <div style={circleRight}></div>

     <div className='absolute top-1/2 -translate-y-3/4 left-[10%]'>
      <div>
       <img src={Logo} alt='logo' />
      </div>
      <h1 className='text-lg font-light text-white'>Kết nối yêu thương</h1>
     </div>
    </div>

    <Outlet />

   </section>
  </>
 )
}

export default AuthLayout
