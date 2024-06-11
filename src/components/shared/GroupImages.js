import React from 'react'

import image1 from '../../images/animals/image1.jpg'
import image2 from '../../images/animals/image2.jpg'
import image3 from '../../images/animals/image3.jpg'
import image4 from '../../images/animals/image4.jpg'
import image5 from '../../images/animals/image5.jpg'
import image6 from '../../images/animals/image6.jpg'
import image7 from '../../images/animals/image7.jpg'
import image8 from '../../images/animals/image8.jpg'
import image9 from '../../images/animals/image9.jpg'

const GroupImages = () => {
 const imageList = [
  {
   id: 1,
   thumb: image1,
  },

  {
   id: 2,
   thumb: image2,
  },

  {
   id: 3,
   thumb: image3,
  },

  {
   id: 4,
   thumb: image4,
  },

  {
   id: 5,
   thumb: image5,
  },

  {
   id: 6,
   thumb: image6,
  },

  {
   id: 7,
   thumb: image7,
  },

  {
   id: 8,
   thumb: image8,
  },

  {
   id: 9,
   thumb: image9,
  },
 ]

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
       {imageList.map(({ id, thumb }) => (
        <li key={id} className='p-1'>
         <img
          className='h-[150px] w-[150px] object-cover rounded'
          src={thumb}
          alt={thumb}
         />
        </li>
       ))}
      </ul>
     </div>
    </div>
   </div>
  </div>
 )
}

export default GroupImages
