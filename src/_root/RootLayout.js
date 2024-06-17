import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
 return (
  <section className='flex flex-col justify-between w-full'>
   <Outlet />
  </section>
 )
}

export default RootLayout
