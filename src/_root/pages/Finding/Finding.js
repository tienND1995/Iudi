import axios from 'axios'
import { useEffect, useState } from 'react'
import Footer from '../../../components/Footer/Footer'
import config from '../../../configs/Configs.json'
import bg from '../../../images/bg3.jpg'
import { Auth } from '../../../service/utils/auth'
import UserList from './UserList'

import Header1 from '../../../components/Header/Header1'

const { FINDING_DEFAULT } = config

function Finding() {
 const { userID } = new Auth()

 const [users, setUsers] = useState([])

 const setting = JSON.parse(localStorage.getItem('findingSetting'))

 useEffect(() => {
  const fetchUsers = async (setting) => {
   try {
    const res = await axios.get(
     `https://api.iudi.xyz/api/location/${userID}/${
      setting?.radius * 1000 || FINDING_DEFAULT
     }`
    )

    const data = res.data.Distances
    const resultData = data.filter((user) => user.Gender !== setting?.gender)

    return setUsers(resultData)
   } catch (error) {
    console.log(error)
   }
  }

  fetchUsers(setting)
 }, [])

 const background = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
 }

 return (
  <div style={background} className=''>
   <Header1 />
   <div className='relative'>
    <div className='px-[40px]'>
     <UserList users={users} />
    </div>
   </div>
   <Footer />
  </div>
 )
}

export default Finding
