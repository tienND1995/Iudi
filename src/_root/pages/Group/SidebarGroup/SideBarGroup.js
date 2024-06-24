import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import Logogroup from '../../../../images/logo-group.png'
import GroupItem from './GroupItem'

import config from '../../../../configs/Configs.json'

import { MdArrowBackIos } from 'react-icons/md'
const { API__SERVER } = config

const SideBarGroup = ({ onLoading }) => {
 const [groupList, setGroupList] = useState([])
 const { groupId } = useParams()

 const navigate = useNavigate()

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
  <div className='text-white mobile:text-black lg:text-[16px] sm:text-[12px] text-[14px] '>
   <div className='flex items-center gap-2 mobile:hidden'>
    <Link>
     <img className='w-[50px] h-auto object-cover ipad:w-[30px] ' src={Logogroup} alt='logo group' />
    </Link>
    <h2 className='uppercase'>Group</h2>
   </div>

   <div className='relative hidden mobile:block font-roboto border-b border-[#00000080] p-3 text-center'>
    <button
     className='absolute left-5 top-1/2 -translate-y-1/2 text-2xl'
     type='button'
     onClick={() => navigate(-1)}
    >
     <MdArrowBackIos />
    </button>

    <h3 className='font-semibold text-xl'>Nhóm</h3>
   </div>

   <ul className='mt-5 mobile:px-3 mobile:pb-[30px]'>
    {groupList.map(({ GroupID, avatarLink, GroupName }) => {
     const imgAvatarRef = React.createRef()

     return (
      <GroupItem
       key={GroupID}
       data={{
        GroupID,
        avatarLink,
        GroupName,
        refImg: imgAvatarRef,
        idParams: groupId,
       }}
      />
     )
    })}
   </ul>
  </div>
 )
}

export default SideBarGroup
