import React, { useEffect, useRef, useState } from 'react'

import { FaUserGroup } from 'react-icons/fa6'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { IoNotifications } from 'react-icons/io5'
import { SiSpringsecurity } from 'react-icons/si'
import { BsInfoSquareFill } from 'react-icons/bs'
import { BsFileRuledFill } from 'react-icons/bs'

import { Link } from 'react-router-dom'

import { Auth } from '../../../service/utils/auth'
import axios from 'axios'
import config from '../../../configs/Configs.json'

import { handleErrorImg } from '../../../service/utils/utils'

const dataList = [
 {
  id: 1,
  name: 'Nhóm',
  link: '/setting/group',
  icon: <FaUserGroup />,
 },

 {
  id: 2,
  name: 'Quyền riêng tư',
  link: '/setting/private',
  icon: <RiGitRepositoryPrivateFill />,
 },

 {
  id: 3,
  name: 'Thông báo',
  link: '/setting/notifi',
  icon: <IoNotifications />,
 },

 {
  id: 4,
  name: 'Điều khoản và điều kiện',
  link: '/setting/rules',
  icon: <BsFileRuledFill />,
 },

 {
  id: 5,
  name: 'Chính sách bảo mật',
  link: '/setting/security',
  icon: <SiSpringsecurity />,
 },

 {
  id: 6,
  name: 'Giới thiệu về chúng tôi',
  link: '/setting/about',
  icon: <BsInfoSquareFill />,
 },
]

const Setting = () => {
 const { URL_BASE64 } = config
 const { userName } = new Auth()
 const [userInfo, serUserInfo] = useState([])

 const fetchProfile = async () => {
  const res = await axios.get(`https://api.iudi.xyz/api/profile/${userName}`)
  const data = res.data.Users[0]
  serUserInfo(data)
 }

 useEffect(() => {
  fetchProfile(userName)
 }, [userName])

 const avatarRef = useRef()

 return (
  <div className='w-full min-h-screen px-3 py-5'>
   <div>
    <h3 className='text-2xl font-semibold'>Cài đặt</h3>

    <div className='flex flex-col items-center'>
     <div>
      <Link to={`/profile/${userName}`}>
       <img
        className='w-[72px] h-[72px] rounded-full object-cover border border-green'
        src={`${URL_BASE64}${userInfo?.avatarLink}`}
        alt='avatar user'
        ref={avatarRef}
        onError={() => handleErrorImg(avatarRef)}
       />
      </Link>
     </div>

     <h3 className='font-[800] text-xl capitalize my-1'>{userInfo?.FullName}</h3>
     <p
      className='font-light text-xl text-[#2C2C2C80] 
'
     >
      {userInfo?.Email}
     </p>
    </div>
   </div>

   <div>
    <ul>
     {dataList.map(({ id, name, icon, link }) => {
      return (
       <li key={id} className='py-3 border-b border-[#00000080]'>
        <Link to={link} className='flex items-center gap-4'>
         <div className='text-xl'>{icon}</div>
         <p className='text-xl font-light'>{name}</p>
        </Link>
       </li>
      )
     })}
    </ul>
   </div>
  </div>
 )
}

export default Setting
