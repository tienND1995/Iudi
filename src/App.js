import { Route, Routes } from 'react-router-dom'
import './App.css'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'react-toastify/dist/ReactToastify.css'

import AuthLayout from './_auth/AuthLayout.js'
import ForgotPassword from './_auth/forms/ForgotPassword.js'
import SigninForm from './_auth/forms/SigninForm.js'
import SignupForm from './_auth/forms/SignupForm.js'

import RootLayout from './_root/RootLayout.js'

import HomeLayout from './_root/pages/HomeLayout/HomeLayout.js'
import Message from './_root/pages/HomeLayout/Message/Message.js'
import Home from './_root/pages/HomeLayout/Home/Home.js'
import MessageDetail from './_root/pages/HomeLayout/Message/MessageDetail.js'

import Profile from './_root/pages/Profile/Profile.js'
import Personal from './_root/pages/Personal/Personal.js'
import Group from './_root/pages/Group/Group.js'
import CreateInfoUser from './_root/pages/CreateInfoUser/CreateInfoUser.js'
import Finding from './_root/pages/Finding/Finding.js'

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
     <Route exact path='/message/' element={<Message />} />
     <Route exact path='/message/:id' element={<MessageDetail />} />
    </Route>

    <Route element={<RootLayout />}>
     <Route path='/profile/:username' element={<Profile />} />
     <Route path='/personal' element={<Personal />} />
     <Route path='/group/:slug/:groupId' element={<Group />}></Route>
     <Route path='finding' element={<Finding/>}/>
    </Route>

    <Route path='/create-info' element={<CreateInfoUser />} />
   </Routes>
  </main>
 )
}

export default App
