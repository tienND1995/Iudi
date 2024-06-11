import { Route, Routes } from 'react-router-dom'
import './App.css'

import AuthLayout from './_auth/AuthLayout.js'
import ForgotPassword from './_auth/forms/ForgotPassword.js'
import SigninForm from './_auth/forms/SigninForm.js'
import SignupForm from './_auth/forms/SignupForm.js'

import HomeLayout from './_root/HomeLayout.js'
import RootLayout from './_root/RootLayout.js'
import {
 EditProfile,
 Group,
 Home,
 Personal,
 Profile,
 CreateInfoUser,
} from './_root/pages/index.js'
import Message from './components/shared/Message.js'

function App() {
 return (
  <main>
   <Routes>
    {/* public routes */}
    <Route element={<AuthLayout />}>
     <Route path='/register' element={<SignupForm />} />
     <Route path='/login' element={<SigninForm />} />
     <Route path='/forgot-password' element={<ForgotPassword />} />
    </Route>

    {/* private routes */}
    <Route element={<HomeLayout />}>
     <Route index element={<Home />} />
     <Route path='/message/:id' element={<Message />} />
    </Route>

    <Route element={<RootLayout />}>
     <Route path='/profile/:username' element={<Profile />} />
     <Route path='/personal' element={<Personal />} />
     <Route path='/profile/edit' element={<EditProfile />} />
     <Route path='/group/:slug/:groupId' element={<Group />}></Route>
    </Route>

    <Route path='/create-info' element={<CreateInfoUser />} />
   </Routes>
  </main>
 )
}

export default App
