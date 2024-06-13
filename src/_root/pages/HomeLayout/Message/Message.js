import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import config from '../../../../configs/Configs.json'

import { useDispatch, useSelector } from 'react-redux'
import {
 fetchMessages,
 messagesSelector,
 postMessage,
 deleteMessage,
} from '../../../../redux/messages/messagesSlice'

import callPhone from '../../../../images/icons/callphone.png'
import callVideo from '../../../../images/icons/callvideo.png'
import send from '../../../../images/icons/send.png'

import { MdDelete } from 'react-icons/md'

import Moment from 'react-moment'
import { Auth } from '../../../../components/shared/Auth'
import AVATAR_DEFAULT from '../../../../images/avatar-default.jpg'

const { AVATAR_DEFAULT_FEMALE, URL_BASE64 } = config

const Message = () => {
 const { id } = useParams()
 const { userID } = new Auth()

 const location = useLocation()
 const { userName, isOnline, userId, avatar } = location.state

 const messRef = useRef()
 const [messageForm, setMessageForm] = useState('')

 const { messages, postToggle } = useSelector(messagesSelector)
 const dispatch = useDispatch()

 useEffect(() => {
  messRef.current.scrollTop = messRef.current.scrollHeight
 }, [messages])

 useEffect(() => {
  dispatch(fetchMessages({ otherUserId: id, userID }))
 }, [id, postToggle])

 const handleSubmitForm = (e) => {
  e.preventDefault()
  if (messageForm.trim() !== '') {
   const data = {
    content: messageForm,
    idReceive: parseInt(id),
    idSend: userId,
    MessageTime: new Date(),
   }

   dispatch(postMessage(data))
   setMessageForm('')
  }
 }

 const handleDeleteMessage = async (messageID) => {
  dispatch(deleteMessage({ messageID, userID }))
 }

 const imgAvatarRef = React.createRef()
 const handleErrorImageAvatar = () => {
  imgAvatarRef.current.src = `${AVATAR_DEFAULT}`
 }

 return (
  <div className='pb-5 bg-white rounded-3xl'>
   <div className='flex  p-5 items-center justify-between border-b-[#817C7C] border-b border-solid'>
    <div className='flex gap-2'>
     <img
      className='w-[66px] h-[66px] rounded-full object-cover'
      src={`${URL_BASE64}${avatar}`}
      alt='avatar default'
      onError={handleErrorImageAvatar}
      ref={imgAvatarRef}
     />

     <div className='flex flex-col justify-center text-black'>
      <h5>{userName}</h5>

      <p className={isOnline ? `text-[#008748]` : 'text-gray'}>
       {isOnline ? 'Đang hoạt động' : 'Đang Offline'}
      </p>
     </div>
    </div>

    <div className='flex gap-5'>
     <div>
      <img src={callVideo} alt='call video' />
     </div>

     <div>
      <img src={callPhone} alt='call phone' />
     </div>
    </div>
   </div>

   <div className='h-[60vh] p-[20px] overflow-y-auto' ref={messRef}>
    {messages.map(
     ({ SenderID, OtherAvatar, MessageID, Content, MessageTime }) => {

      const imgAvatarChat = React.createRef()
      const handleErrorAvatarChat = () => {
       imgAvatarChat.current.src = `${AVATAR_DEFAULT}`
      }

      return SenderID !== parseInt(id) ? (
       <div className='flex justify-end pb-3' key={MessageID}>
        <div className='flex flex-col items-end'>
         <div className='flex items-center gap-1 group'>
          <button
           type='button'
           className='text-black opacity-0 group-hover:opacity-100 duration-200'
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
       <div key={MessageID} className='pb-3'>
        <div className='flex items-center justify-start gap-3 '>
         <div>
          <img
           className='w-[40px] h-[40px] rounded-full'
           src={`${URL_BASE64}${avatar}`}
           alt='avatar default'
           onError={handleErrorAvatarChat}
           ref={imgAvatarChat}
          />
         </div>

         <div className='flex items-center gap-1 group'>
          <p className='bg-black rounded-[8px] p-[10px]'>{Content}</p>
          <button
           type='button'
           className='text-black opacity-0 group-hover:opacity-100 duration-200'
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
    )}
   </div>

   <div>
    <form
     onSubmit={handleSubmitForm}
     className='flex items-center overflow-hidden justify-center p-5 m-3 border text-black h-[70px] rounded-[50px] border-solid border-[#4EC957]'
    >
     <input
      className='w-full mr-5 focus-visible:outline-none '
      type='text'
      placeholder='Hãy gửi lời chào...'
      onChange={(e) => setMessageForm(e.target.value)}
      value={messageForm}
     />

     <div className='flex gap-3'>
      <button type='submit'>
       <img className='ml-5 h-[33px] w-[33px]' src={send} alt='send' />
      </button>
     </div>
    </form>
   </div>
  </div>
 )
}

export default Message
