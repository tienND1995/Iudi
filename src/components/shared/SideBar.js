import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import {
 fetchHistoryMessages,
 messagesSelector,
} from '../../redux/messages/messagesSlice'
import { usersSelector } from '../../redux/users/usersSlice'

import io from 'socket.io-client'
import config from '../../configs/Configs.json'
import AVATAR_DEFAULT from '../../images/avatar-default.jpg'

const { URL_BASE64 } = config

const socket = io('https://api.iudi.xyz')

const SideBar = () => {
 var settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
 }

 const [userIdOtherList, setUserIdOtherList] = useState([])
 const [userOtherList, setUserOtherList] = useState([])

 const { historyMessages, postToggle } = useSelector(messagesSelector)
 const dispatch = useDispatch()

 const userId = localStorage.getItem('UserId')
 const userName = localStorage.getItem('UserNameIuDi')
 const { id } = useParams()

 const userState = useSelector(usersSelector)

 useEffect(() => {
  // client connect to server
  socket.emit('userId', { userId: userId })

  socket.on('online', (data) => {
   setUserIdOtherList(data.user)
  })
 }, [socket, userId])

 useEffect(() => {
  dispatch(fetchHistoryMessages(userId))
 }, [postToggle])

 const getProfileChat = async (id) => {
  if (id && id !== parseInt(userId)) {
   const { data } = await axios.get(`https://api.iudi.xyz/api/chat/${id}`)
   const user = {
    id: data.data[0].UserID,
    username: data.data[0].Username,
    avatar: data.data[0].Avatar,
   }

   if (data.data.length > 0) {
    setUserOtherList([...userOtherList, user])
   }
  }
 }

 useEffect(() => {
  userIdOtherList.forEach((id) => {
   getProfileChat(id)
  })
 }, [userIdOtherList])

 return (
  <>
   <Slider {...settings}>
    <div className='text-center'>
     <Link to={`/profile/${userName}`} >
      <img
       className='mx-auto w-[73px] h-[73px] rounded-full object-cover'
       src={`${URL_BASE64}${userState.user.avatarLink}`}
       alt='avatar'
      />
      <h5 className='capitalize'>{userName}</h5>
     </Link>
    </div>

    {userOtherList.length > 0
     ? userOtherList.map(({ id, username, avatar }) => (
        <div className='text-center' key={id} >
         <Link to={`message/${id}`} state={{
            userName: username,
            isOnline: true,
            id,
            avatar: avatar,
           }}>
          <img
           className=' mx-auto w-[73px] h-[73px] rounded-full object-cover'
           src={`${URL_BASE64}${avatar}`}
           alt='avatar'
          />
          <h5 className='capitalize'> {username}</h5>
         </Link>
        </div>
       ))
     : ''}
   </Slider>

   <div className=' pr-[30px]'>
    <ul>
     {historyMessages.length > 0 ? (
      historyMessages.map(
       ({
        MessageID,
        Content,
        OtherFullname,
        OtherUsername,
        OtherAvatar,
        MessageTime,
        OtherUserID,
       }) => {
        let isOnline = false
        userIdOtherList.some((userId) => (isOnline = userId === OtherUserID))

        const imgAvatarRef = React.createRef()
        const handleErrorImageAvatar = () => {
         imgAvatarRef.current.src = `${AVATAR_DEFAULT}`
        }

        return (
         <li
          key={MessageID}
          style={
           parseInt(id) === OtherUserID ? { background: 'rgba(0,0,0,.2)' } : {}
          }
         >
          <Link
           to={`message/${OtherUserID}`}
           state={{
            userName: OtherFullname,
            isOnline,
            userId,
            avatar: OtherAvatar,
           }}
          >
           <div className='flex items-center justify-between mt-4 cursor-pointer'>
            <div className='flex items-center gap-2'>
             <img
              className=' mx-auto w-[73px] h-[73px] rounded-full object-cover'
              src={`${URL_BASE64}${OtherAvatar}`}
              alt={`avatar ${OtherUsername}`}
              onError={handleErrorImageAvatar}
              ref={imgAvatarRef}
             />

             <div>
              <h3 className='capitalize'>{OtherFullname}</h3>
              <p className='text-gray-500'>{Content}</p>
             </div>
            </div>

            <div className='flex flex-col items-end'>
             <Moment date={`${MessageTime}+0700`} format='hh:mm A' />
             {isOnline && (
              <span
               className={`w-[16px] h-[16px] rounded-full bg-[#FFA451]`}
              ></span>
             )}
            </div>
           </div>
          </Link>
         </li>
        )
       }
      )
     ) : (
      <li></li>
     )}
    </ul>
   </div>
  </>
 )
}

export default SideBar
