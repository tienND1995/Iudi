import React, { useState, useRef } from 'react'

import { useForm } from 'react-hook-form'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className'

import Slider from 'react-slick'
import dayjs from 'dayjs'

import BgImage from '../../images/bg3.jpg'
import Logo from '../../images/logoApp.png'

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

const dataList = [
 {
  id: 1,
  label: 'Create your Bio',
  placeholder: 'Your Bio',
  type: 'text',
  key: 'Bio',
 },

 {
  id: 2,
  label: 'What do want to be called?',
  placeholder: 'Your Name',
  type: 'text',
  key: 'FullName',
 },

 {
  id: 3,
  label: 'When is your birthday ?',
  placeholder: 'mm/dd/yyyy',
  type: 'date',
  key: 'BirthDate',
 },

 {
  id: 4,
  label: 'Hãy nhập quê quán của bạn',
  placeholder: 'Quê quán của tôi',
  type: 'text',
  key: 'BirthPlace',
 },

 {
  id: 5,
  label: 'Enter your phone number',
  placeholder: 'Phone number',
  type: 'text',
  key: 'Phone',
 },

 {
  id: 6,
  label: 'Enter your address',
  placeholder: 'Your address',
  type: 'text',
  key: 'CurrentAdd',
 },
]

const CreateInfoUser = () => {
 const styles = {
  background: `no-repeat center/cover url(${BgImage})`,
  height: '100vh',
 }

 const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: 'create-info slick-dots',

  customPaging: (i) => {
   return (
    <div
     style={{
      width: '28px',
      height: '28px',
      borderRadius: '50%',

      border: '1px solid #4EC957',
     }}
    ></div>
   )
  },
 }

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm()

 // *___________ handle birthdate_____________

 ClassNameGenerator.configure((LocalizationProvider) =>
  LocalizationProvider.replace('Mui', 'InfoUser')
 )

 const [dateValue, setDateValue] = useState(null)
 const handleChangeDate = (value) => {
  setDateValue(value)
 }

 //  console.log(dayjs(dateValue).format('YYYY-MM-DD'))

 let sliderRef = useRef(null)
 const handleNext = () => {
  sliderRef.slickNext()
 }

 const handleSubmitForm = (data) => {
  console.log(data)
 }

 const [text, setText] = React.useState('')
 return (
  <section>
   <div style={styles} className='flex'>
    <div className='mx-auto'>
     <div className='mt-[125px]'>
      <img className='mx-auto' src={Logo} alt='logo' />
     </div>

     <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className=' w-[80vw] h-[70vh] px-[50px] py-[150px] rounded-[20px] border border-1 border-greenlight'
     >
      <Slider
       {...settings}
       ref={(slider) => {
        sliderRef = slider
       }}
      >
       {dataList.map(({ id, label, placeholder, type, key }) => (
        <SlideItem
         key={id}
         data={{
          id,
          label,
          placeholder,
          type,
          key,
          handleChangeDate,
          handleNext,
          register: register,
         }}
        />
       ))}
      </Slider>

      <button className='text-white' type='submit'>
       submit
      </button>
     </form>
    </div>
   </div>
  </section>
 )
}

export default CreateInfoUser
