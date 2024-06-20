import React from 'react'

import { MdDelete } from 'react-icons/md'
import Moment from 'react-moment'
import { handleErrorImg } from '../../../../service/utils/utils'

import config from '../../../../configs/Configs.json'
const { URL_BASE64 } = config

const MessageDetailItem = (props) => {
 const {
  SenderID,
  OtherAvatar,
  MessageID,
  Content,
  MessageTime,
  refImg,
  idParams,
  handleDeleteMessage,
 } = props.data

 return SenderID !== parseInt(idParams) ? (
  <div className='flex justify-end pb-3'>
   <div className='flex flex-col items-end'>
    <div className='flex items-center gap-1 group'>
     <button
      type='button'
      className='text-black duration-200 opacity-0 group-hover:opacity-100'
      onClick={() => handleDeleteMessage(MessageID)}
     >
      <MdDelete />
     </button>
     <p className='bg-blue-600 rounded-[8px] p-[10px]'>{Content}</p>
    </div>

    <Moment
     date={`${MessageTime}+0700`}
     format='hh:mm A'
     className='text-xs text-gray-500'
    />
   </div>
  </div>
 ) : (
  <div className='pb-3'>
   <div className='flex items-center justify-start gap-3 '>
    <div>
     <img
      className='w-[40px] h-[40px] rounded-full'
      src={`${URL_BASE64}${OtherAvatar}`}
      alt='avatar default'
      onError={() => handleErrorImg(refImg)}
      ref={refImg}
     />
    </div>

    <div className='flex items-center gap-1 group'>
     <p className='bg-black rounded-[8px] p-[10px]'>{Content}</p>
     <button
      type='button'
      className='text-black duration-200 opacity-0 group-hover:opacity-100'
      onClick={() => handleDeleteMessage(MessageID)}
     >
      <MdDelete />
     </button>
    </div>
   </div>
   <Moment
    date={`${MessageTime}+0700`}
    format='hh:mm A'
    className='text-xs text-gray-500'
   />
  </div>
 )
}

export default MessageDetailItem
