import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { AiFillCloseCircle } from 'react-icons/ai'
import Modal from 'react-modal'

import config from '../../../configs/Configs.json'
import uploadFile from '../../../images/icons/uploadFile.png'

import { useDispatch } from 'react-redux'
import { addPost, patchPost } from '../../../redux/posts/postsSlice'
import { Auth } from '../Auth'

const { AVATAR_DEFAULT_MALE, LONGITUDE_DEFAULT, LATITUDE_DEFAULT } = config

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
   const imageUrl = URL.createObjectURL(file)

   if (!file) return

   setFormPost({
    ...formPost,
    image: imageUrl,
    file: e.target.value,
   })
   return
  }
 }

 const handleSubmitFormPost = async (e) => {
  e.preventDefault()

  if (content.trim() === '' || title.trim() === '') return

  const data = {
   Content: content.trim(),
   PhotoURL: image ? [image] : null,
   Title: title.trim(),
   GroupID: groupId,
   PostLatitude: LATITUDE_DEFAULT,
   PostLongitude: LONGITUDE_DEFAULT,
  }

  const postID = post.PostID

  method === 'post'
   ? dispatch(addPost({ data, userID }))
   : dispatch(patchPost({ data, postID }))
  setFormPost({
   content: '',
   image: null,
   title: '',
   file: '',
  })
 }

 return (
  <Modal
   isOpen={showModal}
   style={modalStyles}
   ariaHideApp={false}
   contentLabel='Modal Form'
  >
   <div className='relative flex justify-center p-2 border-b border-solid border-b-white'>
    <h2>{method === 'post' ? 'Create' : 'edit'} post</h2>
    <button
     className='absolute right-2 top-[50%] translate-y-[-50%] text-lg text-white'
     onClick={hiddenModal}
     type='button'
    >
     <AiFillCloseCircle />
    </button>
   </div>

   <form className='p-5' onSubmit={handleSubmitFormPost}>
    <div className='flex items-center gap-2'>
     <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
      <img src={AVATAR_DEFAULT_MALE} alt='avatar user' />
     </div>
     <h2>Nguyen Dang tien</h2>
    </div>

    <input
     className='mt-3 bg-transparent focus-visible:outline-none'
     type='text'
     name='title'
     placeholder='Tiêu đề'
     onChange={handleChangeFormPost}
     value={title}
    />

    <textarea
     type='text'
     id='textarea-post'
     placeholder='Nội dung'
     className='min-h-[50px] my-3 bg-transparent w-full focus-visible:outline-none'
     value={content}
     onChange={handleChangeFormPost}
     name='content'
    />

    {image && (
     <div className='relative rounded-lg overflow-hidden h-[150px]'>
      <img
       className='object-cover object-center w-full h-full'
       src={image}
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
    <div className='relative my-3 w-max bg-[#303030] py-2 px-5 rounded-md'>
     <div className='flex gap-1'>
      <img src={uploadFile} alt='upload file' />
      <spa>Ảnh/Video</spa>
     </div>

     <input
      onChange={handleChangeFormPost}
      className='absolute z-10 inset-0 opacity-0 focus-visible:outline-none'
      type='file'
      name='image'
      value={file}
     />
    </div>

    <button className='w-full py-2 rounded-md bg-success' type='submit'>
     Post
    </button>
   </form>
  </Modal>
 )
}

export default FormPost
