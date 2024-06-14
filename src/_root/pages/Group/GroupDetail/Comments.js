import React, { useRef } from 'react'

import CommentItem from './CommentItem'

import { FaChevronDown } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'

const Comments = ({ comments }) => {
 const { comentList, commentRef, inputCommentRef, onSubmitComment } = comments

 const refUlElement = useRef()
 const refIcondown = useRef()

 return (
  <div id='comment-list' className='hidden duration-200' ref={commentRef}>
   {comentList.length > 0 ? (
    <div>
     <div>
      <button
       //    onClick={() => {
       //     const isHidden = refUlElement.current.classList.contains('hidden')

       //     if (isHidden) {
       //      refUlElement.current.classList.remove('hidden')
       //      refIcondown.current.style.transform = 'rotate(0)'

       //      return
       //     }

       //     refUlElement.current.classList.add('hidden')
       //     refIcondown.current.style.transform = 'rotate(180deg)'
       //    }}
       className='flex gap-2 items-center my-3'
       type=''
      >
       <p>Bình luận liên quan nhất</p>
       <div ref={refIcondown}>
        <FaChevronDown />
       </div>
      </button>
     </div>

     <ul ref={refUlElement} className='transition-all duration-200'>
      {comentList.map(
       ({
        FavoriteCount,
        CommentID,
        FullName,
        Content,
        CommentUpdateTime,
        IsFavorited,
        UserID,
        PostID,
        Avatar,
       }) => {
        const imgRef = React.createRef()

        return (
         <CommentItem
          key={CommentID}
          data={{
           FavoriteCount,
           CommentID,
           FullName,
           Content,
           CommentUpdateTime,
           IsFavorited,
           UserID,
           PostID,
           Avatar,
           imgRef,
          }}
         />
        )
       }
      )}
     </ul>
    </div>
   ) : (
    ''
   )}

   <div>
    <form
     onSubmit={onSubmitComment}
     className='flex items-center overflow-hidden justify-center p-5 border bg-white text-black h-[60px] rounded-[20px] mt-5'
    >
     <input
      className='w-full mr-5 focus-visible:outline-none '
      type='text'
      placeholder='Viết bình luận...'
      ref={inputCommentRef}
     />

     <div className='flex gap-3'>
      <button type='submit' className='text-[30px]'>
       <IoMdSend />
      </button>
     </div>
    </form>
   </div>
  </div>
 )
}

export default Comments
