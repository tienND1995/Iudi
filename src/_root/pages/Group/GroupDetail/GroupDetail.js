import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
 addLikePost,
 deletePost,
 fetchPosts,
 postComment,
 postsSelector,
} from '../../../../redux/posts/postsSlice'
import { usersSelector } from '../../../../redux/users/usersSlice'

import Moment from 'react-moment'
import { ToastContainer } from 'react-toastify'

import { GoKebabHorizontal } from 'react-icons/go'
import { MdDeleteForever, MdModeEditOutline } from 'react-icons/md'

import btnlike from '../../../../images/icons/btnlike.png'
import heart from '../../../../images/icons/heart.png'
import uploadFile from '../../../../images/icons/uploadFile.png'

import config from '../../../../configs/Configs.json'
import { Auth } from '../../../../components/shared/Auth'
import Comments from './Comments'
import FormPost from './FormPost'

import AVATAR_DEFAULT from '../../../../images/avatar-default.jpg'

const { API__SERVER, URL_BASE64 } = config

const GroupDetail = () => {
 const { userID } = new Auth()
 const { groupId } = useParams()
 const [postList, setPostList] = useState([])

 const { posts, changeTogglePosts } = useSelector(postsSelector)
 const userState = useSelector(usersSelector)

 const dispatch = useDispatch()

 useEffect(() => {
  dispatch(fetchPosts({ groupId, userID }))
 }, [changeTogglePosts, groupId])

 useEffect(() => {
  const newPosts = []
  posts.length > 0
   ? posts.forEach(async (post, index) => {
      const comments = await getComments(post.PostID)
      const newPost = { ...post, comments }
      newPosts.push(newPost)

      if (index === posts.length - 1) setPostList(newPosts)
     })
   : setPostList(newPosts)
 }, [posts])

 const [modal, setModal] = useState({
  showModal: false,
  method: 'post',
  post: {},
 })

 const handleShowModal = (name, post) => {
  setModal({
   showModal: true,
   post: post,
   method: name === 'post' ? 'post' : 'patch',
  })
 }
 const handleHiddenModal = () => setModal({ ...modal, showModal: false })

 const getComments = async (postID) => {
  const { data } = await axios.get(
   `${API__SERVER}/forum/comment/${postID}/${userID}`
  )
  return data.Comments
 }

 const IMAGE_POST_PLACEHOLDER =
  'https://placehold.co/600x400?text=Post+Placholder'

 return (
  <div>
   <div className='relative p-5 rounded-lg bg-[#222222] border border-solid border-[#4EC957]'>
    <div className='flex gap-2 items-center'>
     <img
      className='w-[73px] h-[73px] rounded-full object-cover'
      src={`${URL_BASE64}${userState.user.avatarLink}`}
      alt='avatar user'
     />
     <button
      type='button'
      className='h-max'
      onClick={() => handleShowModal('post', {})}
     >
      Hãy viết nên suy nghĩ của mình !
     </button>
    </div>

    <div className='mt-3 flex justify-between'>
     <button
      onClick={() => handleShowModal('post', {})}
      type='button'
      className='relative bg-[#303030] py-2 px-5 rounded-[20px] flex gap-1 '
     >
      <img src={uploadFile} alt='upload file' />
      <spa>Ảnh/Video</spa>
     </button>

     {/* <button type='submit' className='bg-[#4EC957] rounded-[20px]  py-2 px-5'>
      Đăng
     </button> */}
    </div>
   </div>

   <div>
    <ul>
     {postList.length > 0 ? (
      postList.map(
       ({
        Content,
        PostID,
        UserFullName,
        Avatar,
        FavoriteCount,
        FirstComment,
        Title,
        UpdatePostAt,
        Photo,
        IsFavorited,
        comments,
       }) => {
        const refBtn = React.createRef()
        const refComment = React.createRef()
        const refInputComment = React.createRef()

        const handleSubmitComment = (e) => {
         e.preventDefault()
         const value = refInputComment.current.value
         if (value.trim() === '') return

         const data = { Content: value }
         dispatch(postComment({ PostID, data, userID }))
         refInputComment.current.value = ''
        }

        const handleShowComments = () => {
         refComment.current.classList.remove('hidden')
         refInputComment.current.focus()
        }

        const imgAvatarRef = React.createRef()
        const handleErrorImageAvatar = () => {
         imgAvatarRef.current.src = `${AVATAR_DEFAULT}`
        }

        const imgPostRef = React.createRef()
        const handleErrorImagePost = () => {
         imgPostRef.current.src = `${IMAGE_POST_PLACEHOLDER}`
        }

        return (
         <li
          key={PostID}
          className='mt-5 bg-[#222222] rounded-xl border border-solid border-[#4EC957]'
         >
          <div className='p-5 flex justify-between'>
           <div className='flex gap-2 items-center'>
            <img
             className='w-[73px] h-[73px] rounded-full object-cover'
             src={`${URL_BASE64}${Avatar}`}
             alt='avatar other'
             ref={imgAvatarRef}
             onError={handleErrorImageAvatar}
            />
            <div>
             <h3>{UserFullName}</h3>

             <Moment fromNow>{`${UpdatePostAt}+0700`}</Moment>
            </div>
           </div>

           <div className='h-max relative'>
            <button
             className='text-[30px]'
             type=''
             onClick={(e) => {
              const isHidden = refBtn.current.classList.contains('hidden')
              if (isHidden) {
               refBtn.current.classList.remove('hidden')
               refBtn.current.classList.add('flex')
              } else {
               refBtn.current.classList.add('hidden')
               refBtn.current.classList.remove('flex')
              }
             }}
            >
             <GoKebabHorizontal />
            </button>
            <div
             ref={refBtn}
             className={
              'flex-col gap-2 hidden p-5 bg-[#222] min-w-[200px] shadow-[0px_0px_8px_#000] absolute right-0 top-100 z-[10] rounded-md'
             }
            >
             <div>
              <button
               className='bg-[#363434] p-1 rounded duration-200 hover:bg-[#544e4e] flex gap-2 items-center w-full'
               onClick={() => {
                if (window.confirm('Are you sure you want to delete?'))
                 dispatch(deletePost(PostID))
                refBtn.current.classList.add('hidden')
                refBtn.current.classList.remove('flex')
               }}
               type='button'
              >
               <MdDeleteForever /> Delete post
              </button>
             </div>

             <div>
              <button
               className='bg-[#363434] p-1 rounded duration-200 hover:bg-[#544e4e] flex gap-2 items-center w-full'
               type='button'
               onClick={() => {
                refBtn.current.classList.add('hidden')
                refBtn.current.classList.remove('flex')
                handleShowModal('patch', { PostID, Title, Photo, Content })
               }}
              >
               <MdModeEditOutline /> Edit post
              </button>
             </div>
            </div>
           </div>
          </div>

          <div>
           <div className='pl-5 pb-5'>
            <h2 className='capitalize text-lg'>{Title}</h2>
            <p>{Content}</p>
           </div>
           {Photo && (
            <img
             className='w-full object-cover'
             src={`${URL_BASE64}${Photo}`}
             ref={imgPostRef}
             alt={Title}
             onError={handleErrorImagePost}
            />
           )}
          </div>

          <div className='py-3 px-5'>
           <div className='flex justify-between items-center pb-1'>
            <div className='flex gap-1 items-center'>
             <div className='w-[20px] h-[20px] rounded-full bg-white p-1 flex items-center justify-center'>
              <img src={heart} alt='like' />
             </div>

             {FavoriteCount}
            </div>
            <button onClick={handleShowComments} type='button'>
             {comments.length} bình luận
            </button>
           </div>

           <hr />

           <div className='flex gap-3 mt-3 ml-5'>
            <button
             className='flex gap-1 bg-[#303030] py-2 px-5 rounded-[20px] hover:opacity-70 hover:transition-[0.3s]'
             type='button'
             onClick={() => dispatch(addLikePost({ postId: PostID, userID }))}
            >
             <img
              className='w-[20px] h-[20px] transition'
              src={btnlike}
              alt='like'
             />
             {IsFavorited ? 'Đã thích' : 'Thích'}
            </button>

            <button
             className='flex gap-1 bg-[#303030] py-2 px-5 rounded-[20px] hover:opacity-70 hover:transition-[0.3s]'
             type='button'
             onClick={handleShowComments}
            >
             Bình luận
            </button>
           </div>

           <Comments
            comments={{
             comentList: comments,
             onSubmitComment: handleSubmitComment,
             showComment: handleShowComments,
             refComment: refComment,
             refInputComment: refInputComment,
            }}
           />
          </div>
         </li>
        )
       }
      )
     ) : (
      <li className='mt-5'>
       <h2>KHÔNG CÓ BÀI VIẾT NÀO</h2>
      </li>
     )}
    </ul>
   </div>

   <FormPost modal={modal} hiddenModal={handleHiddenModal} />

   <ToastContainer position='bottom-right' autoClose={5000} />
  </div>
 )
}

export default GroupDetail
