import Modal from 'react-modal'

import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import changePasswordSchema from '../../schemas/changePassword'
import { joiResolver } from '@hookform/resolvers/joi'
import { toast } from 'react-toastify'

const FormChangePassword = ({ userId, isOpen, onClose }) => {
 const modalStyles = {
  content: {
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   width: '400px',
   height: 'max-content',
   color: 'white',
   padding: '0 !important',
   border: 'none',
   background: 'transparent',
  },

  overlay: {
   background: 'rgba(0, 0, 0,.7)',
   zIndex: 999,
  },
 }

 const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isValid },
 } = useForm({ resolver: joiResolver(changePasswordSchema) })
 const handleChangePassword = async (data) => {
  try {
   const response = await axios.patch(
    `https://api.iudi.xyz/api/profile/change_password/${userId}`,
    data
   )
   if (response.status === 200) {
    toast.success('Change password successfully!') && reset()
   } else {
    toast.warning('An error occur!')
   }
  } catch (error) {
   toast.error('ERROR:', error)
  }
 }

 return (
  <Modal isOpen={isOpen} style={modalStyles}>
   <div className='bg-white w-[350px] h-[400px] rounded-2xl border-4 border-green-400 mx-auto my-auto flex items-center justify-center'>
    <form onSubmit={handleSubmit(handleChangePassword)}>
     <div className='mb-8 mt-3'>
      <input
       type='password'
       name='password'
       id='password'
       placeholder='Old Password'
       className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
        errors.Password ? 'border-red-400' : 'border-green-400'
       }`}
       {...register('Password')}
      />
      {errors.Password && (
       <p className='text-red-500 text-sm font-bold mt-2'>
        {' '}
        {errors.Password.message}{' '}
       </p>
      )}
     </div>
     <div className='mb-8'>
      <input
       type='password'
       name='password'
       id='newpassword'
       placeholder='New Password'
       className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
        errors.NewPassword ? 'border-red-400' : 'border-green-400'
       }`}
       {...register('NewPassword')}
      />
      {errors.NewPassword && (
       <p className='text-red-500 text-sm font-bold mt-2'>
        {' '}
        {errors.NewPassword.message}{' '}
       </p>
      )}
     </div>
     <div className='mb-8'>
      <input
       type='password'
       name='password'
       id='cfpassword'
       placeholder='Confirm Password'
       className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
        errors.CfNewPassword ? 'border-red-400' : 'border-green-400'
       }`}
       {...register('CfNewPassword')}
      />
      {errors.CfNewPassword && (
       <p className='text-red-500 text-sm font-bold mt-2'>
        {' '}
        {errors.CfNewPassword.message}{' '}
       </p>
      )}
     </div>
     <button
      className='inline-block bg-black text-white rounded shadow py-2 px-11 text-sm mt-8'
      type='submit'
     >
      Submit
     </button>
     <button
      className='inline-block bg-black text-white rounded shadow py-2 px-5 text-sm ml-4'
      type='button'
      onClick={onClose}
     >
      Cancel
     </button>
    </form>
   </div>
  </Modal>
 )
}

export default FormChangePassword
