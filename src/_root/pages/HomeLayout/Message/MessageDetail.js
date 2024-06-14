import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
 deleteMessage,
 fetchMessages,
 messagesSelector,
 postMessage,
} from '../../../../service/redux/messages/messagesSlice'

import MessageDetailItem from './MessageDetailItem'

import callPhone from '../../../../images/icons/callphone.png'
import callVideo from '../../../../images/icons/callvideo.png'
import send from '../../../../images/icons/send.png'

import { handleErrorImg } from '../../../../service/utils/utils'
import { Auth } from '../../../../service/utils/auth'

import config from '../../../../configs/Configs.json'
const { URL_BASE64 } = config

const MessageDetail = () => {
 const { id } = useParams()
 const { userID } = new Auth()

 const location = useLocation()
 const { userName, isOnline, avatar } = location.state

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
    idSend: userID,
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

 return (
  <div className='pb-5 bg-white rounded-3xl'>
   <div className='flex  p-5 items-center justify-between border-b-[#817C7C] border-b border-solid'>
    <div className='flex gap-2'>
     <Link to={`/profile/${userName}`}>
      <img
       className='w-[66px] h-[66px] rounded-full object-cover'
       src={`${URL_BASE64}${avatar}`}
       alt='avatar default'
       onError={() => handleErrorImg(imgAvatarRef)}
       ref={imgAvatarRef}
      />
     </Link>

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

      return (
       <MessageDetailItem
        key={SenderID}
        data={{
         SenderID,
         OtherAvatar,
         MessageID,
         Content,
         MessageTime,
         refImg: imgAvatarChat,
         idParams: id,
         handleDeleteMessage,
        }}
       />
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

export default MessageDetail
