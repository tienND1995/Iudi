import React from 'react'

const FormField = (props) => {
 const { errors, register, name, label } = props.data

 const today = new Date().toLocaleDateString('sv-SE')


 return (
  <div
   className={`${
    errors.FullName ? 'border-red-400' : 'border-[#008748]'
   } border border-solid p-2 mt-5 overflow-hidden bg-white rounded-md`}
  >
   <label className='text-xs font-light text-black' htmlFor={name}>
    {label}
   </label>
   <input
    type={name === 'BirthDate' ? 'date' : 'text'}
    id={name}
    placeholder={label}
    max={name === 'BirthDate' ? today : undefined}
    className='block w-full text-xs font-semibold text-black bg-white outline-none placeholder:font-normal'
    {...register(`${name}`)}
   />
   {errors[name] && (
    <p className='mt-1 text-xs font-bold text-red-500'>
     {errors[name].message}
    </p>
   )}
  </div>
 )
}

export default FormField
