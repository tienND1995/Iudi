import React from 'react'
import Logo from '../../images/logoApp.png'

import heart from '../../images/icons/heart.png'
import zesus from '../../images/icons/zesus.png'
import loader from '../../images/icons/loader.png'
import close from '../../images/icons/close.png'
import star from '../../images/icons/star.png'
import avatar from '../../images/icons/avatar-demo.png'

const Home = () => {
  return (
    <div className="">
      <div>
        <a href="/" className="block">
          <img className="mx-auto" src={Logo} alt="logo" />
        </a>
      </div>

      <div className="relative grid grid-cols-2 rounded-[58px] mx-[40px] mt-[30px]">
        <div className="h-[60vh] rounded-tl-[58px] rounded-bl-[58px] overflow-hidden">
          <img
            className="object-cover object-center w-full h-full"
            src={avatar}
            alt="avatar user"
          />
        </div>
        <div className="rounded-tr-[58px] rounded-br-[58px] bg-[#368A69] flex items-center justify-center flex-col">
          <h2 className="name">Mai Phương Thúy</h2>
          <p className="">Yêu màu hông ghét sự giả dối</p>
        </div>

        <div className="absolute bottom-0 translate-y-[60px] -translate-x-2/4 left-2/4 flex gap-3">
          <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
            <img src={close} alt="close" />
          </button>
          <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
            <img src={loader} alt="loader" />
          </button>
          <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
            <img src={star} alt="star" />
          </button>
          <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
            <img src={zesus} alt="zesus" />
          </button>
          <button className="w-[125px] h-[125px] flex items-center justify-center rounded-full bg-white">
            <img src={heart} alt="heart" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
