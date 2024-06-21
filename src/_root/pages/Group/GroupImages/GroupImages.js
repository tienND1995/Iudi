import React from 'react'

import { useSelector } from 'react-redux'
import { postsSelector } from '../../../../service/redux/posts/postsSlice'

import { handleErrorImgPost } from '../../../../service/utils/utils'

import config from '../../../../configs/Configs.json'
const { URL_BASE64 } = config

const GroupImages = () => {
 const postsState = useSelector(postsSelector)

 const imageList = postsState.posts.map(({ PostID, Photo }) => ({
  id: PostID,
  thumb: Photo,
 }))

 return (
  <div>
   <div className='p-3 bg-black rounded-md w-max mx-auto'>
    <div className='bg-gray-700 rounded p-2'>
     <div className='flex justify-between'>
      <h5>Ảnh</h5>

      <div>
       <button type=''>Xem tất cả ảnh</button>
      </div>
     </div>
     <div className=''>
      <ul className='grid grid-cols-3'>
       {imageList.map(({ id, thumb }) => {
        const imgRef = React.createRef()
        return (
         <li key={id} className='p-1'>
          <img
           className='h-[150px] w-[150px] object-cover rounded'
           src={`${URL_BASE64}${thumb}`}
           alt={thumb}
           onError={() => handleErrorImgPost(imgRef)}
           ref={imgRef}
          />
         </li>
        )
       })}
      </ul>
     </div>
    </div>
   </div>
  </div>
 )
}

export default GroupImages
