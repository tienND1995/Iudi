import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

const SlideItem = (props) => {
 const { data } = props
 const {
  type,
  placeholder,
  label,
  key,
  handleChangeDate,
  handleNext,
  register,
 } = data
 return (
  <div>
   <div className='flex flex-col items-center gap-5'>
    <h3 className='font-semibold text-greenlight text-[35px]'>{label}</h3>
    <div>
     {type === 'date' ? (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
       {/* <DemoContainer components={['DatePicker']}>
           <DatePicker onChange={handleChangeDate} />
          </DemoContainer> */}

       <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <DatePicker label={'year'} views={['year']} />
        <DatePicker label={'day'} views={['day']} />
        <DatePicker label={'month'} views={['month']} />
       </DemoContainer>
      </LocalizationProvider>
     ) : (
      <input
       className='text-white w-[600px] h-[66px] text-[27px] placeholder:text-[27px] placeholder:text-[#777] placeholder:font-normal focus:outline-none border border-green rounded-[33px]  bg-transparent px-5'
       placeholder={placeholder}
       type='text'
       name=''
       {...register(key)}
      />
     )}
    </div>

    <p className='text-[20px] text-[#777] font-medium'>
     This is how you’ll appear on IUDI
    </p>

    <div>
     <button
      onClick={handleNext}
      className='px-[46px] py-4 transition-all duration-200 hover:bg-white rounded-[30px] text-black bg-greenlight  text-[20px] font-medium'
      type=''
     >
      Continue
     </button>
    </div>
   </div>
  </div>
 )
}

export default SlideItem
