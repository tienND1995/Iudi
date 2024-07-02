import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { usersSelector } from '../../../../service/redux/users/usersSlice'

import { AiFillCloseCircle } from 'react-icons/ai'
import Modal from 'react-modal'

import config from '../../../../configs/Configs.json'
import uploadFile from '../../../../images/icons/uploadFile.png'

import { addPost, patchPost } from '../../../../service/redux/posts/postsSlice'
import { Auth } from '../../../../service/utils/auth'

import { handleErrorImg } from '../../../../service/utils/utils'

import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'

import { postSchema } from '../../../../service/schemas/schemas'


const { URL_BASE64, LONGITUDE_DEFAULT, LATITUDE_DEFAULT } = config

const FormPost = (props) => {
 const modalStyles = {
  content: {
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   width: '400px',
   height: 'max-content',
   background: '#1a1919',
   color: 'white',
   padding: '0 !important',
   border: 'none',
  },

  overlay: {
   background: 'rgba(0, 0, 0,.7)',
  },
 }

 const modalMobileStyles = {
  content: {
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   width: '90%',
   height: 'max-content',
   background: '#fff',
   color: 'black',
   padding: '0 !important',
   border: 'none',
  },

  overlay: {
   background: 'rgba(0, 0, 0,.7)',
  },
 }

 const userState = useSelector(usersSelector)

 const dispatch = useDispatch()
 const { groupId } = useParams()

 const { userID } = new Auth()

 const { modal, hiddenModal } = props
 const { showModal, method, post } = modal

 const [formPost, setFormPost] = useState({
  content: '',
  image: null,
  title: '',
  file: '',
 })
 const { content, image, title, file } = formPost

 //register
 const {
  register,
  handleSubmit,
  setValue,
  reset,
  formState: { errors, isValid }
 } = useForm({ resolver: joiResolver(postSchema) })



 useEffect(() => {
  method === 'patch'
   ? setFormPost({
      content: post.Content,
      image: post.Photo,
      title: post.Title,
      file: '',
     })
   : setFormPost({ content: '', image: null, title: '', file: '' })
 }, [modal])

 const handleChangeFormPost = (e) => {
  if (e.target.name === 'image') {
   let file = e.target.files[0]
   if (!file) return

   const reader = new FileReader()
   reader.readAsDataURL(file)

   reader.onloadend = () => {
    const base64Url = reader.result.split(',')[1]
    setFormPost({
     ...formPost,
     image: base64Url,
     file: e.target.value,
    })
   }
   return
  }

  setFormPost({
   ...formPost,
   [e.target.name]: e.target.value,
  })

  setValue(e.target.name, e.target.value)
 }

 const handleSubmitFormPost = async (data) => {

  if(isValid) {
      const { content, title } = data
      const postData = {
        Content: content.trim(),
        PhotoURL: image ? [image] : null,
        Title: title.trim(),
        GroupID: groupId,
        PostLatitude: LATITUDE_DEFAULT,
        PostLongitude: LONGITUDE_DEFAULT,
      };
  
      const postID = post.PostID;
  
      if (method === 'post') {
        dispatch(addPost({ data: postData, userID }));
      } else {
        dispatch(patchPost({ data: postData, postID }));
      }
      // setFormPost({
      // content: '',
      // image: null,
      // title: '',
      // file: '',
      // })
      reset()

      hiddenModal()
  }
}

 const [isMobile, setIsMobile] = useState(false)
 useEffect(() => {
  const widthWindow = window.document.body.offsetWidth
  widthWindow <= 450 && setIsMobile(true)
 }, [])

 return (
  <Modal
   isOpen={showModal}
   style={isMobile ? modalMobileStyles : modalStyles}
   ariaHideApp={false}
   contentLabel='Modal Form'
  >
   <div className='mobile:bg-[#008748] relative flex justify-center p-2 border-b border-solid border-b-white'>
    <h2 className='text-white'>{method === 'post' ? 'Create' : 'Edit'} post</h2>
    <button
     className='absolute right-2 top-[50%] translate-y-[-50%] text-lg text-white'
     onClick={hiddenModal}
     type='button'
    >
     <AiFillCloseCircle />
    </button>
   </div>

   <form className='p-5' onSubmit={handleSubmit(handleSubmitFormPost)}>
    <div className='flex items-center gap-2'>
     <div>
      <img
       className='w-[50px] h-[50px] rounded-full object-cover'
       src={`${URL_BASE64}${userState.user.avatarLink}`}
       alt='avatar user'
       onError={(e) => handleErrorImg(e.target)}
      />
     </div>
     <h2>Nguyen Dang tien</h2>
    </div>

    <input
     className='mt-3 bg-transparent focus-visible:outline-none'
     type='text'
     name='title'
     placeholder='Tiêu đề'
     onChange={handleChangeFormPost}
     {...register('title')}
    />
    {errors.title && <p className='mt-2 text-sm ipad:mt-1 ipad:text-xs ipad:font-semibold tablet:mt-1 tablet:text-xs tablet:font-semibold font-bold text-red-500'>{errors.title.message}</p>}

    <textarea
     type='text'
     id='textarea-post'
     placeholder='Nội dung'
     className='min-h-[50px] my-3 bg-transparent w-full focus-visible:outline-none'
     onChange={handleChangeFormPost}
     name='content'
     {...register('content')}
    />
    {errors.content && <p className='mt-2 text-sm ipad:mt-1 ipad:text-xs ipad:font-semibold tablet:mt-1 tablet:text-xs tablet:font-semibold font-bold text-red-500'>{errors.content.message}</p>}

    {image && (
     <div className='relative rounded-lg overflow-hidden h-[150px]'>
      <img
       className='object-cover object-center w-full h-full'
       src={`${URL_BASE64}${image}`}
       alt='postImage'
      />

      <button
       className='absolute text-xl text-gray-900 transition right-2 top-2 hover:text-black'
       onClick={() => setFormPost({ ...formPost, image: null, file: '' })}
       type='button'
      >
       <AiFillCloseCircle />
      </button>
     </div>
    )}
    <div className='relative my-3 w-max text-white mobile:bg-[#008748] bg-[#303030] py-2 px-5 rounded-md'>
     <div className='flex gap-1'>
      <img src={uploadFile} alt='upload file' />
      <span>Ảnh/Video</span>
     </div>

     <input
      onChange={handleChangeFormPost}
      className='absolute z-10 inset-0 opacity-0 focus-visible:outline-none'
      type='file'
      name='image'
      value={file}
     />
    </div>

    <button
     className='w-full py-2 rounded-md text-white bg-[#008748]'
     type='submit'
    >
     Post
    </button>
   </form>
  </Modal>
 )
}

export default FormPost
