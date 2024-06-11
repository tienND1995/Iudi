import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
 return (
  <section className='flex flex-col justify-between w-full h-screen'>
   <Outlet />
  </section>
 )
}

export default RootLayout
