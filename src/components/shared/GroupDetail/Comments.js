import React, { useRef } from 'react'
import Moment from 'react-moment'

import { useDispatch } from 'react-redux'
import {
 likeUnlikeComment,
 removeComment,
} from '../../../redux/posts/postsSlice'

import { FaChevronDown } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

import config from '../../../configs/Configs.json'

const { AVATAR_DEFAULT_FEMALE, API__SERVER } = config

const Comments = ({ comments }) => {
 const { comentList, refComment, refInputComment, onSubmitComment } = comments

 const dispatch = useDispatch()

 const refUlElement = useRef()
 const refIcondown = useRef()

 return (
  <div id='comment-list' className='hidden duration-200' ref={refComment}>
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
        const refDeleteComment = React.createRef()

        return (
         <li key={CommentID} className='flex gap-2 items-start mb-4'>
          <div>
           <img
            className='w-[42px] h-[42px] object-cover rounded-full'
            src={AVATAR_DEFAULT_FEMALE || Avatar}
            alt='avatar other user'
           />
          </div>

          <div>
           <div className='flex gap-2 items-center group '>
            <div className='bg-[#423f3f] p-2 rounded-xl'>
             <h3 className='text-xs font-semibold capitalize'>{FullName}</h3>
             <p className='text-xs'>{Content}</p>
            </div>

            <div>
             <button
              onClick={() => {
               dispatch(removeComment(CommentID))
              }}
              className='opacity-0 transition-all duration-100 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-700 btn-show-delete'
             >
              <MdDelete />
             </button>
            </div>
           </div>

           <div className='flex gap-3 text-[7px] mt-1'>
            <Moment fromNow ago>{`${CommentUpdateTime}+0700`}</Moment>

            <div className='flex gap-1'>
             <span>{FavoriteCount !== 0 && FavoriteCount}</span>
             <button
              type=''
              onClick={() =>
               dispatch(
                likeUnlikeComment({ commentID: CommentID, userID: UserID })
               )
              }
              className={IsFavorited ? 'text-primary' : 'text-white'}
             >
              Thích
             </button>
            </div>
            <div>
             <button type=''>Trả lời</button>
            </div>
           </div>
          </div>
         </li>
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
      ref={refInputComment}
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
