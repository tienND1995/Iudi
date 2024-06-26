import { Link, useLocation } from 'react-router-dom'
import NavMobile from '../../../components/NavMobile/NavMobile'
import UserItem from './UserItem'
import {
 AdjustmentsHorizontalIcon,
 ChevronLeftIcon,
} from '@heroicons/react/24/outline'

const FindingResult = () => {
 const location = useLocation()
 const { users } = location.state

 return (
  <div className='hidden mobile:flex flex-col min-h-screen overflow-y-auto'>
   <div className='hidden mobile:flex justify-between p-4 items-center border-b-[#817C7C] border-b border-solid'>
    <Link to='/finding'>
     <button className='w-8 h-8 '>
      <ChevronLeftIcon />
     </button>
    </Link>
    <span className='text-[22px] font-bold'>Tìm quanh đây</span>
    <div className='rounded-full bg-[#008748] w-10 h-10 p-1'>
     <AdjustmentsHorizontalIcon className='text-white' />
    </div>
   </div>
   <div className='flex-1 overflow-y-auto pb-[100px]'>
    {users.map((user) => {
     return <UserItem user={user} key={user.UserID} />
    })}
   </div>
   <NavMobile />
  </div>
 )
}

export default FindingResult
