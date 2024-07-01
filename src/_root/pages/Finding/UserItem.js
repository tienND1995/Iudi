import { useEffect, useState } from 'react'
import axios from 'axios'

import { MapPinIcon } from '@heroicons/react/24/outline'

import { handleErrorImg } from '../../../service/utils/utils'
import { Auth } from '../../../service/utils/auth'
import config from '../../../configs/Configs.json'

const { URL_BASE64 } = config

const UserItem = ({ user, key }) => {
 const date = new Date()
 const yearNow = date.getFullYear()
 const birthDate = new Date(user.BirthDate)

 const { userID } = new Auth()
 const [distance, setDistance] = useState(0)

 useEffect(() => {
  const fetDistanceUserVsOtherUser = async () => {
   const res = await axios.get(
    `https://api.iudi.xyz/api/location/distance/${userID}/${user.UserID}`
   )

   setDistance((parseInt(res.data.distance) / 1000).toFixed(2))
  }

  fetDistanceUserVsOtherUser()
 }, [user.UserID])

 return (
  <div
   key={key}
   className='flex justify-between items-center border-b border-gray-500 mt-5 mx-3 pb-3'
  >
   <div className='flex'>
    <div className='mx-2'>
     <img
      className=' mx-auto w-[60px] h-[60px] rounded-full object-cover border border-slate-900'
      src={`${URL_BASE64}${user.avatarLink}`}
      alt={`avatar ${user.FullName}`}
      onError={(e) => handleErrorImg(e.target)}
     />
    </div>

    <div>
     <span className='font-extrabold'>{user.FullName}</span>

     <p className=''>
      {user?.BirthDate === null
       ? ''
       : `${
          yearNow - birthDate.getFullYear() === 0
           ? 1
           : yearNow - birthDate.getFullYear()
         } tuổi`}
     </p>
    </div>
   </div>

   <div>
    <MapPinIcon className='text-[#008748] w-6' />
    <span>{distance}km</span>
   </div>
  </div>
 )
}

export default UserItem
