import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Auth } from '../../service/utils/auth'
import { Link, useNavigate } from 'react-router-dom'
import { slugString } from '../../service/utils/utils'

const MenuTablet = () => {
 const { isLogin, userName } = new Auth()
 const navigate = useNavigate()
 const [openNav, setOpenNav] = useState(false)

 const [groupFirst, setGroupFirst] = useState({})
 const [isGetGroupFirst, setIsGetGroupFirst] = useState(false)

 useEffect(() => {
  const fetchGroups = async () => {
   try {
    const response = await axios.get(
     'https://api.iudi.xyz/api/forum/group/all_group'
    )
    setGroupFirst(response.data.data[0])
    setIsGetGroupFirst(true)
   } catch (error) {
    console.error('Error fetching data:', error)
   }
  }
  fetchGroups()
 }, [])

 const { GroupName, GroupID } = groupFirst

 const navList = [
  {
   name: 'Home',
   link: '/',
   id: 1,
  },

  {
   name: 'Finding',
   link: '/finding',
   id: 2,
  },

  {
   name: 'Profile',
   link: `/profile/${userName}`,
   id: 3,
  },

  isGetGroupFirst && {
   name: 'Group',
   id: 4,
   link: `/group/${slugString(GroupName)}/${GroupID}`,
  },
 ]
 return (
  <nav>
   <ul>
    {navList.map(({ id, name, link }) => (
     <li key={id}>
      <Link to={link}>{name}</Link>
     </li>
    ))}
   </ul>
  </nav>
 )
}

export default MenuTablet
