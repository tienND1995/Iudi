import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectOnlineStatus, toggleOnlineStatus } from '../../../../service/redux/messages/messagesSlice';

const Private = () => {
  // const [isStatus, setIsStatus] = useState(true)

  // const handleChangeStatus = () => {
  //  setIsStatus(!isStatus)
  // }

  const isOnline = useSelector(selectOnlineStatus)
  const dispatch = useDispatch()
  console.log(isOnline)

  const handleChangeStatus = () => {
    dispatch(toggleOnlineStatus())
  }

 return (
  <div className='text-[16px] font-normal px-3 pt-[40px]'>
   <div>
    <h2 className='font-medium text-[#008748] text-xl'>Cá nhân</h2>

    <div className='flex items-center justify-between py-2'>
     <h5>Trạng thái</h5>

     <select className='text-[10px] font-semibold'>
      <option value=''>Chia sẻ</option>
      <option value=''>Riêng tư</option>
     </select>
    </div>

    <div className='flex items-center justify-between py-2'>
     <h5>Hiện thị trạng thái truy cập</h5>

     <div>
      <button
       onClick={handleChangeStatus}
       className={`${
        isOnline
         ? 'bg-[#008748] border border-[#008748]'
         : 'bg-gray-700 border border-gray-700 '
       } transition-all duration-200 flex overflow-hidden w-[53px] h-[24px] rounded-full `}
       type='button'
      >
       <div
        className={`${
          isOnline ? 'ml-[28px]' : ''
        } duration-200 transition-all w-[23px] h-[23px] bg-white rounded-full`}
       ></div>
      </button>
     </div>
    </div>
   </div>

   <div className='mt-3'>
    <h2 className='font-medium text-[#008748] text-xl'>Tin nhắn và cuộc gọi</h2>

    <div className='flex justify-between py-2 border-b border-[#00000080]'>
     <h5>Hiện thị trạng thái đã xem</h5>

     <select className='text-[10px] font-semibold'>
      <option value=''>Đang tắt</option>
      <option value=''>Bật</option>
     </select>
    </div>

    <div className='flex justify-between py-2 border-b border-[#00000080]'>
     <h5>Cho phép nhắn tin</h5>
     <select className='text-[10px] font-semibold'>
      <option value=''>Mọi người</option>
      <option value=''>Bạn bè</option>
     </select>
    </div>
   </div>

   <div className='mt-3'>
    <h2 className='font-medium text-[#008748] text-xl'>Chặn và ẩn</h2>

    <div className='flex justify-between py-2 border-b border-[#00000080]'>
     <h5>Chặn tin nhắn</h5>
    </div>
   </div>
  </div>
 )
}

export default Private
