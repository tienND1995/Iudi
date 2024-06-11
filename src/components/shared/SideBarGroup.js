import axios from 'axios'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Logogroup from '../../images/logo-group.png'
import yeuhanoi from '../../images/yeuhanoi.png'

import { slugString } from './slugString'
import config from '../../configs/Configs.json'
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
    <Link to='/group'>
     <img src={Logogroup} alt='logo group' />
    </Link>
    <h2 className='uppercase'>Group</h2>
   </div>

   <ul className='mt-5'>
    {groupList.map(({ GroupID, avatarLink, GroupName }) => (
     <li
      key={GroupID}
      className=' mb-3'
      style={
       (GroupID === parseInt(groupId) ? { background: 'rgba(0,0,0,.2)' } : {})
      }
     >
      <Link
       to={`/group/${slugString(GroupName)}/${GroupID}`}
       className='flex flex-wrap gap-2 items-center'
      >
       <div>
        <img src={yeuhanoi} alt={GroupName} />
       </div>

       <h5>{GroupName}</h5>
      </Link>
     </li>
    ))}
   </ul>
  </div>
 )
}

export default SideBarGroup
