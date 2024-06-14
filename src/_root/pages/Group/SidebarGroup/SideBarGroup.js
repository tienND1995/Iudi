import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Logogroup from '../../../../images/logo-group.png'
import GroupItem from './GroupItem'

import config from '../../../../configs/Configs.json'
const { API__SERVER } = config

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
    <Link>
     <img src={Logogroup} alt='logo group' />
    </Link>
    <h2 className='uppercase'>Group</h2>
   </div>

   <ul className='mt-5'>
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
