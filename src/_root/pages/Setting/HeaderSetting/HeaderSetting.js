import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { MdArrowBackIos } from 'react-icons/md'

const HeaderSetting = () => {
 const navigate = useNavigate()
 const { state } = useLocation()
 return (
  <div className='relative font-roboto border-b border-[#00000080] py-4 px-2 text-center'>
   <button
    className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl'
    type='button'
    onClick={() => navigate(-1)}
   >
    <MdArrowBackIos />
   </button>

   <h3 className='font-semibold text-xl'>{state.title}</h3>
  </div>
 )
}

export default HeaderSetting
