import axios from "axios";
import { React, useEffect, useState, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

import Line from "../../../components/shared/Line";

import { useSelector, useDispatch } from "react-redux";
import {
  usersSelector,
  patchAvatar,
  patchProfile,
} from "../../../service/redux/users/usersSlice";

import Header2 from "../../../components/Header/Header2";
import Footer from "../../../components/Footer/Footer";
import background from "../../../images/bg3.jpg";

import { joiResolver } from "@hookform/resolvers/joi";
import { profileSchema } from "../../../service/schemas/schemas";
import FormField from "./FormField";
import { formEditData } from "../../../components/shared/globalData";

import { Auth } from "../../../service/utils/auth";
import config from "../../../configs/Configs.json";

import Policy from "./Policy";
import MessageBlock from "./MessageBlock";
import PersonalImg from "./PersonalImg";

const { URL_BASE64 } = config;

function Personal() {
  const [avatar, setAvatar] = useState(null);
  const { userName, userID } = new Auth();
  const [isChangeImage, setIsChangeImage] = useState(false);

  const [isStatus, setIsStatus] = useState(true);
  const [isPrivate, setIsPrivate] = useState(true);
  const [isWatched, setIsWatched] = useState(true);
  const [isBlockChat, setIsBlockChat] = useState(true);

  const handleChangeStatus = () => {
    setIsStatus(!isStatus);
  };

  const handleChangePrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const handleChangeWatched = () => {
    setIsWatched(!isWatched);
  };

  const handleBlockChat = () => {
    setIsBlockChat(!isBlockChat);
  };

  const backgroundImage = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    // backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  const dispatch = useDispatch();
  const userState = useSelector(usersSelector);
  const { user, isLoading } = userState;

  useEffect(() => {
    user.avatarLink && setAvatar(user.avatarLink);
  }, [user]);

  // *________________ SAVE FINDING_______________

  const [radius, setRadius] = useState("0");
  const [age, setAge] = useState("12");
  const [gender1, setGender1] = useState("Nam");

  const onHandleChangeRadius = (e) => {
    setRadius(e.target.value);
  };
  const onHandleChangeAge = (e) => {
    setAge(e.target.value);
  };
  const onHandleChangeGender = (e) => {
    setGender1(e.target.value);
  };
  const onHandleSave = () => {
    const findingSetting = {
      radius: radius,
      minAge: age,
      gender: gender1,
    };
    localStorage.setItem("findingSetting", JSON.stringify(findingSetting));
    toast.success("Lưu cài đặt thành công!", { autoClose: 1000 });
  };

  // * ___________  handle FORM ___________

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: async () => {
      const response = await axios.get(
        `https://api.iudi.xyz/api/profile/${userName}`
      );
      const { Bio, FullName, BirthDate, BirthPlace, CurrentAdd, Phone } =
        response.data.Users[0];

      return { Bio, FullName, BirthDate, BirthPlace, CurrentAdd, Phone };
    },
    resolver: joiResolver(profileSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64Url = reader.result.split(",")[1];
      if (base64Url !== avatar) {
        setAvatar(base64Url);
        setIsChangeImage(true);
      }
    };
  };

  const handleSubmitform = async (data) => {
    if (isChangeImage) {
      dispatch(patchAvatar({ image: avatar, userID }));
    }

    if (isDirty) {
      dispatch(patchProfile({ data, userID }));
    }
  };

  // * _______ SET HEIGHT  ________
  const [heightHeader, setHeightHeader] = useState(150);
  const [widthSidebar, setWidthSidebar] = useState(400);
  const [isDark, setIsDark] = useState(false);
  const sidebarRef = useRef();

  const contentStyles = {
    marginTop: `${heightHeader}px`,
    marginLeft: `${widthSidebar}px`,
    width: `calc(100% - ${widthSidebar}px)`,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  };

  const getHeightHeader = (height) => setHeightHeader(height);

  useEffect(() => {
    window.onscroll = () => {
      document.documentElement.scrollTop > 0
        ? setIsDark(true)
        : setIsDark(false);
    };

    setWidthSidebar(sidebarRef?.current?.offsetWidth);
  }, []);

  const [showMobile, setShowMobile] = useState(false);
  const decktopRef = useRef();

  useEffect(() => {
    const isDecktopHidden = decktopRef?.current?.offsetWidth === 0;
    isDecktopHidden ? setShowMobile(true) : setShowMobile(false);
  }, [decktopRef]);

  return !showMobile ? (
    <div style={backgroundImage} className="mobile:hidden" ref={decktopRef}>
      <Header2
        isDark={isDark}
        onGetHeight={getHeightHeader}
        isPositionFixed={true}
      />

      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 mobile:hidden ipad:hidden tablet:w-[300px] w-[400px] border-r-2 border-white h-screen"
      >
        <div className="mt-[200px] ml-[50px] mr-[50px]">
          <h1 className="text-3xl font-semibold text-white text-green-600 mb-11">
            Cài đặt tìm kiếm
          </h1>
          <label
            className="mt-8 mb-2 text-sm font-bold text-gray-700 "
            htmlFor="fullname"
            style={{
              color: "rgba(44,186,55,0.8127626050420168)",
            }}
          >
            <div className="flex justify-between">
              <span className="text-white">Khoảng cách (m): </span>
              <span className="font-bold text-white">{radius}</span>
            </div>
            <input
              type="range"
              min={0}
              max={5000}
              onChange={onHandleChangeRadius}
              className="mt-4 range range-success range-xs range-infor"
            />
          </label>
          <label
            className="block mt-3 mb-2 text-sm font-bold text-white"
            htmlFor="gender"
          >
            Xu hướng
          </label>

          <select
            onChange={onHandleChangeGender}
            className="w-full px-3 py-2 mt-2 mb-4 bg-white focus:outline-none text-black"
            defaultValue="Nam"
            id="gender"
          >
            <option className="text-green-600">Nam</option>
            <option className="text-green-600">Nữ</option>
            <option className="text-green-600">Đồng tính Nam</option>
            <option className="text-green-600">Đồng tính nữ</option>
          </select>
          <label
            className="mt-8 mb-2 text-sm font-bold text-gray-700 "
            htmlFor="fullname"
            style={{
              color: "rgba(44,186,55,0.8127626050420168)",
            }}
          >
            <div className="flex justify-between">
              <span className="text-white">Độ tuổi:</span>
              <span className="font-bold text-white">Từ {age} trở lên</span>
            </div>
            <input
              type="range"
              min={12}
              max={100}
              onChange={onHandleChangeAge}
              className="mt-4 range range-success range-xs range-infor"
            />
          </label>
          <button
            onClick={onHandleSave}
            className="inline-block py-2 mt-8 text-sm text-white rounded shadow bg-green px-11"
            type="button"
          >
            Lưu cài đặt
          </button>
        </div>
      </div>
      <div style={contentStyles} className="ml-[600px] pt-[60px]">
        {/* class='bg-[#252525] px-[20px] mt-[60px] ml-[900px] py-[50px] mx-auto w-[490px] border-2 border-green-500 rounded-lg shadow-lg' */}

        <div className="w-[95%]">
          <PersonalImg />
        </div>

        <div className="flex xl:flex-row flex-col mt-5 justify-between w-[95%]">
          {/* user form */}
          <div className="w-[450px] bg-[#252525] border border-[#4EC957] rounded-lg py-[50px] px-[20px]">
            <div className="mb-[15px] flex flex-col items-center ">
              <h1 className="text-[34px] font-semibold text-[#4EC957]">
                Thông tin cá nhân
              </h1>

              <p className="text-white text-[15px] font-[300] mt-2">
                Hãy điền thông tin cá nhân để chúng ta hiểu nhau hơn
              </p>
            </div>

            {isLoading === "pending" ? (
              <h3 className="text-white">Loading...</h3>
            ) : (
              <>
                <div className="flex items-end justify-center">
                  <img
                    src={`${URL_BASE64}${avatar}`}
                    alt="personal"
                    className="w-[100px] h-[100px] rounded-[10px] mr-[5px] object-cover"
                  />

                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 bg-[#3d773d] text-white p-[3px] rounded-[5px] hover:cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </label>
                </div>

                <form onSubmit={handleSubmit(handleSubmitform)}>
                  {formEditData.map(({ id, name, label }) => (
                    <FormField
                      key={id}
                      data={{
                        errors,
                        register,
                        name,
                        label,
                      }}
                    />
                  ))}

                  <button
                    className={`${
                      isDirty || isChangeImage ? "hover:bg-green" : "opacity-50"
                    }  duration-200 w-full mt-5 font-semibold text-[20px] text-white rounded-lg h-[50px] shadow bg-[#008748]`}
                    type="submit"
                    disabled={
                      isDirty == false && isChangeImage === false ? true : false
                    }
                  >
                    {isSubmitting ? "Loading..." : "Lưu"}
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="w-[590px] bg-[#252525] border border-[#4EC957] rounded-lg">
            <h1 className="text-[28px] font-semibold text-white text-center">
              Quyền riêng tư
            </h1>

            <div>
              {/* status */}
              <div className="flex mt-3">
                <h5 className="text-white mx-4 w-[215px]">
                  Hiển thị trạng thái truy cập
                </h5>

                <div>
                  <button
                    onClick={handleChangeStatus}
                    className={`${
                      isStatus
                        ? "bg-[#008748] border border-[#008748]"
                        : "bg-gray-700 border border-gray-700"
                    } transition-all duration-200 flex overflow-hidden w-[70px] h-[30px] rounded-full p-1`}
                    type="button"
                  >
                    <div
                      className={`${
                        isStatus ? "ml-[34px]" : ""
                      } duration-200 transition-all w-[23px] h-[23px] bg-white rounded-full`}
                    ></div>
                  </button>
                </div>
              </div>

              {/* Private */}

              <div className="flex mt-3">
                <h5 className="text-white mx-4 w-[215px]">
                  Hiển thị trạng thái ẩn danh
                </h5>

                <div>
                  <button
                    onClick={handleChangePrivate}
                    className={`${
                      isPrivate
                        ? "bg-[#008748] border border-[#008748]"
                        : "bg-gray-700 border border-gray-700"
                    } transition-all duration-200 flex overflow-hidden w-[70px] h-[30px] rounded-full p-1`}
                    type="button"
                  >
                    <div
                      className={`${
                        isPrivate ? "ml-[34px]" : ""
                      } duration-200 transition-all w-[23px] h-[23px] bg-white rounded-full`}
                    ></div>
                  </button>
                </div>
              </div>

              {/*Watched  */}
              <div className="flex mt-3">
                <h5 className="text-white mx-4 w-[215px]">
                  Hiển thị trạng thái đã xem
                </h5>

                <div>
                  <button
                    onClick={handleChangeWatched}
                    className={`${
                      isWatched
                        ? "bg-[#008748] border border-[#008748]"
                        : "bg-gray-700 border border-gray-700"
                    } transition-all duration-200 flex overflow-hidden w-[70px] h-[30px] rounded-full p-1`}
                    type="button"
                  >
                    <div
                      className={`${
                        isWatched ? "ml-[34px]" : ""
                      } duration-200 transition-all w-[23px] h-[23px] bg-white rounded-full`}
                    ></div>
                  </button>
                </div>
              </div>

              {/* Block message */}
              <div className="flex mt-3">
                <h5 className="text-white mx-4 w-[215px]">
                  Từ chối nhận tin nhắn
                </h5>

                <div>
                  <button
                    onClick={handleBlockChat}
                    className={`${
                      isBlockChat
                        ? "bg-[#008748] border border-[#008748]"
                        : "bg-gray-700 border border-gray-700"
                    } transition-all duration-200 flex overflow-hidden w-[70px] h-[30px] rounded-full p-1`}
                    type="button"
                  >
                    <div
                      className={`${
                        isBlockChat ? "ml-[34px]" : ""
                      } duration-200 transition-all w-[23px] h-[23px] bg-white rounded-full`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-white mx-4 w-[215px]">Chặn tin nhắn</h5>

              <div className="bg-[#262D34]">
                <MessageBlock />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[95%] mt-8">
          <Policy />
        </div>

        <Footer />
      </div>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  ) : (
    <div className="w-full min-h-screen bg-white py-[50px] px-[20px] relative">
      <div className="mb-[15px] flex flex-col items-center ">
        <div className="relative w-full text-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Link to={`/profile/${userName}`} className="text-black">
              <IoIosArrowBack />
            </Link>
          </div>
          <h1 className="text-xl font-semibold text-black">
            Thông tin cá nhân
          </h1>
        </div>

        <p className="text-sm font-[300] mt-2">
          Hãy điền thông tin cá nhân để chúng ta hiểu nhau hơn
        </p>
      </div>

      {isLoading === "pending" ? (
        <h3 className="text-black text-center">Loading...</h3>
      ) : (
        <>
          <div className="flex items-end justify-center">
            <img
              src={`${URL_BASE64}${avatar}`}
              alt="personal"
              className="w-[70px] h-[70px] rounded-full mr-[5px] object-cover"
            />

            <label htmlFor="imageUpload" className="cursor-pointer">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 bg-[#3d773d] text-white p-[3px] rounded-[5px] hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </label>
          </div>

          <form onSubmit={handleSubmit(handleSubmitform)}>
            {formEditData.map(({ id, name, label }) => (
              <FormField
                key={id}
                data={{
                  errors,
                  register,
                  name,
                  label,
                }}
              />
            ))}

            <button
              className={`${
                isDirty || isChangeImage ? "hover:bg-green" : "opacity-50"
              }  duration-200 w-full mt-5 font-semibold text-[20px] text-white rounded-lg h-[55px] shadow bg-[#008748]`}
              type="submit"
              disabled={
                isDirty == false && isChangeImage === false ? true : false
              }
            >
              {isSubmitting ? "Loading..." : "Lưu"}
            </button>
          </form>
        </>
      )}

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}

export default Personal;
