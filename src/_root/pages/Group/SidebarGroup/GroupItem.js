import React from 'react'
import { Link } from 'react-router-dom'
import { slugString, handleErrorImg, handleErrorImgGroup } from '../../../../service/utils/utils'

import config from '../../../../configs/Configs.json'
const { URL_BASE64 } = config

const GroupItem = (props) => {
 const { GroupID, avatarLink, GroupName, idParams } = props.data

 return (
  <li
   key={GroupID}
   className=' mb-3'
   style={
    GroupID === parseInt(idParams) ? { background: 'rgba(0,0,0,.2)' } : {}
   }
  >
   <Link
    state={{ avatarLink, groupName: GroupName }}
    to={`/group/${slugString(GroupName)}/${GroupID}`}
    className='flex flex-wrap gap-2 items-center'
   >
    <div>
     <img
      alt={GroupName}
      onError={(e) => handleErrorImgGroup(e.target)}
      src={`${URL_BASE64}${avatarLink}`}
      className='w-[80px] h-[80px] ipad:w-[30px] ipad:h-[30px] rounded-full border-2 border-solid border-[#fdfdfd]'
     />
    </div>

    <h5 className='text-[14px] ipad:text-[8px]'>{GroupName}</h5>
   </Link>
  </li>
 )
}

export default GroupItem
