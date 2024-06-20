import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Auth } from '../../../service/utils/auth'
import PreLogin from './PreLogin/PreLogin'
import Line from '../../../components/shared/Line'

import Header2 from '../../../components/Header/Header2'
import background from '../../../images/bg3.jpg'
import SideBar from './Message/Message'

const HomeLayout = () => {
  const { isLogin } = new Auth()

  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    color: 'white',
  }

  const [heightHeader, setHeightHeader] = useState('200')
  const sidebarStyles = {
    height: `calc(100vh - ${heightHeader}px)`,
  }
  const getHeightHeader = (height) => setHeightHeader(height)

  if (!isLogin) return <PreLogin />

  return (
    <>
      <div style={backgroundImageStyle} className="block mobile:hidden">
        <Header2 onGetHeight={getHeightHeader} />
        <div className="grid grid-cols-4 ipad:grid-cols-3 tablet:grid-cols-3">
          <div
            style={sidebarStyles}
            className="p-5 col-span-1 ipad:hidden mobile:hidden overflow-y-scroll overflow-x-hidden"
            id="sidebar-message"
          >
            <SideBar />
          </div>
          <div className="col-span-3 ipad:col-span-3 tablet:col-span-2 p-5">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="mobile:block hidden relative z-10 min-h-screen">
        <Outlet />
        <Line />
      </div>
    </>
  )
}

export default HomeLayout
