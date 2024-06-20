import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Line from '../../../components/shared/Line'
import HeaderMobile from './HeaderSetting/HeaderSetting'

const SettingLayout = () => {
 const { pathname } = useLocation()

 const isMatchSetting = pathname === '/setting' || pathname === '/setting/'

 return (
  <div className='min-h-screen w-full relative'>
   {!isMatchSetting && <HeaderMobile />}
   <Outlet />
   <Line />
  </div>
 )
}

export default SettingLayout
