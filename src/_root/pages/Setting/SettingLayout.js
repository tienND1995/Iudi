import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import HeaderMobile from './HeaderSetting/HeaderSetting'

const SettingLayout = () => {
 const { pathname } = useLocation()

 const isMatchSetting = pathname === '/setting' || pathname === '/setting/'
 const isMatchSettingGroup =
  pathname === '/setting/group' || pathname === '/setting/group/'

 return (
  <div className='min-h-screen w-full relative'>
   {!isMatchSettingGroup && !isMatchSetting && <HeaderMobile />}
   <Outlet />
   {/* {!isMatchSetting && <Line />} */}
  </div>
 )
}

export default SettingLayout
