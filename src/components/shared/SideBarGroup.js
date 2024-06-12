import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Logogroup from '../../images/logo-group.png'
import AVATAR_DEFAULT from '../../images/avatar-default.jpg'

import config from '../../configs/Configs.json'
import { slugString } from './slugString'
const { API__SERVER, URL_BASE64 } = config

const SideBarGroup = ({ onLoading }) => {
 const [groupList, setGroupList] = useState([])
 const { groupId } = useParams()

 useEffect(() => {
  const fetchGroups = async () => {
   try {
    const response = await axios.get(`${API__SERVER}/forum/group/all_group`)
    setGroupList(response.data.data)
    onLoading(true)
   } catch (error) {
    console.error('Error fetching data:', error)
   }
  }
  fetchGroups()
 }, [])

 return (
  <div className='text-white'>
   <div className='flex items-center gap-2'>
    <Link to='/group'>
     <img src={Logogroup} alt='logo group' />
    </Link>
    <h2 className='uppercase'>Group</h2>
   </div>

   <ul className='mt-5'>
    {groupList.map(({ GroupID, avatarLink, GroupName }) => {
     const imgAvatarRef = React.createRef()
     const handleErrorImageAvatar = () => {
      imgAvatarRef.current.src = `${AVATAR_DEFAULT}`
     }
     return (
      <li
       key={GroupID}
       className=' mb-3'
       style={
        GroupID === parseInt(groupId) ? { background: 'rgba(0,0,0,.2)' } : {}
       }
      >
       <Link
        to={`/group/${slugString(GroupName)}/${GroupID}`}
        className='flex flex-wrap gap-2 items-center'
       >
        <div>
         <img
          alt={GroupName}
          onError={handleErrorImageAvatar}
          ref={imgAvatarRef}
          src={`${URL_BASE64}${avatarLink}`}
          className='w-[80px] h-[80px] rounded-full border-2 border-solid border-[#fdfdfd]'
         />
        </div>

        <h5>{GroupName}</h5>
       </Link>
      </li>
     )
    })}
   </ul>
  </div>
 )
}

export default SideBarGroup
