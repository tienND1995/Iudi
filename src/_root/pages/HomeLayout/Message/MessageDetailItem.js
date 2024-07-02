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
  idParams,
  handleDeleteMessage,
  Image,
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

     {Content !== '' && Content !== null && (
      <p className='bg-blue-600 rounded-[8px] p-[10px]'>{Content}</p>
     )}

     {Image && (
      <img
       className='w-[50px] h-[50px] object-cover rounded'
       src={`${URL_BASE64}${Image}`}
       alt='sendImage'
      />
     )}
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
      className='w-[40px] h-[40px] rounded-full object-cover'
      src={`${URL_BASE64}${OtherAvatar}`}
      alt='avatar default'
      onError={(e) => handleErrorImg(e.target)}
     />
    </div>

    <div className='flex items-center gap-1 group'>
     {Content !== '' && Content !== null && (
      <p className='bg-black rounded-[8px] p-[10px]'>{Content}</p>
     )}

     {Image && (
      <img
       className='w-[50px] h-[50px] object-cover rounded'
       src={`${URL_BASE64}${Image}`}
       alt='sendImage'
      />
     )}

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
