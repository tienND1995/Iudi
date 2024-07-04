import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { useDispatch } from "react-redux";
import {
  addLikePost,
  deletePost,
} from "../../../../service/redux/posts/postsSlice";

import { GoKebabHorizontal } from "react-icons/go";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";

import Comments from "./Comments";

import btnlike from "../../../../images/icons/btnlike.png";
import heart from "../../../../images/icons/heart.png";

import config from "../../../../configs/Configs.json";
import {
  handleErrorImgPost,
  handleErrorImg,
} from "../../../../service/utils/utils";

import { Auth } from "../../../../service/utils/auth";

const { URL_BASE64 } = config;

const PostItem = (props) => {
  const { userID } = new Auth();

  const {
    Content,
    PostID,
    UserFullName,
    Avatar,
    FavoriteCount,
    Title,
    UpdatePostAt,
    Photo,
    IsFavorited,
    comments,
    Username,
    UserID,
  } = props.data;

  const {
    btnRef,
    handleShowModal,
    handleShowComments,
    handleSubmitComment,
    inputCommentRef,
    commentRef,
  } = props.handle;

  const dispatch = useDispatch();

  const isUpdate = userID === UserID;

  return (
    <li
      key={PostID}
      className="mt-5 bg-[#222222] mobile:bg-white mobile:border-none mobile:rounded-none rounded-xl border border-solid border-[#4EC957]"
    >
      <div className="p-5 flex justify-between">
        <div className="flex gap-2 items-center">
          <Link to={`/profile/${Username}`}>
            <img
              className="w-[73px] h-[73px] rounded-full object-cover"
              src={`${URL_BASE64}${Avatar}`}
              alt="avatar other"
              onError={(e) => handleErrorImg(e.target)}
            />
          </Link>
          <div>
            <h3>{UserFullName}</h3>

            <Moment fromNow>{`${UpdatePostAt}+0700`}</Moment>
          </div>
        </div>

        <div className="h-max relative">
          <button
            className="text-[30px]"
            type=""
            onClick={(e) => {
              const isHidden = btnRef.current.classList.contains("hidden");
              if (isHidden) {
                btnRef.current.classList.remove("hidden");
                btnRef.current.classList.add("flex");
              } else {
                btnRef.current.classList.add("hidden");
                btnRef.current.classList.remove("flex");
              }
            }}
          >
            <GoKebabHorizontal />
          </button>
          <div
            ref={btnRef}
            className={
              "flex-col gap-2 hidden p-5 bg-[#222] min-w-[200px] mobile:bg-white mobile:shadow-[0px_0px_6px_#dddada] shadow-[0px_0px_8px_#000] absolute right-0 top-100 z-[10] rounded-md"
            }
          >
            <div>
              <button
                className="bg-[#363434] mobile:bg-[#008748] mobile:text-white p-1 rounded duration-200 mobile:hover:bg-[#008748ce] hover:bg-[#544e4e] flex gap-2 items-center w-full"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete?"))
                    dispatch(deletePost(PostID));
                  btnRef.current.classList.add("hidden");
                  btnRef.current.classList.remove("flex");
                }}
                type="button"
              >
                <MdDeleteForever /> Delete post
              </button>
            </div>

            {isUpdate && (
              <div>
                <button
                  className="bg-[#363434] mobile:bg-[#008748] mobile:text-white p-1 rounded duration-200 mobile:hover:bg-[#008748ce] hover:bg-[#544e4e] flex gap-2 items-center w-full"
                  type="button"
                  onClick={() => {
                    btnRef.current.classList.add("hidden");
                    btnRef.current.classList.remove("flex");
                    handleShowModal("patch", { PostID, Title, Photo, Content });
                  }}
                >
                  <MdModeEditOutline /> Edit post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="pl-5 pb-5">
          <h2 className="capitalize text-lg">{Title}</h2>
          <p>{Content}</p>
        </div>
        {Photo && (
          <img
            className="w-full object-cover max-h-[300px]"
            src={`${URL_BASE64}${Photo}`}
            alt={Title}
            onError={(e) => handleErrorImgPost(e.target)}
          />
        )}
      </div>

      <div className="py-3 px-5">
        <div className="flex justify-between items-center pb-1">
          <div className="flex gap-1 items-center">
            <div className="w-[20px] h-[20px] rounded-full bg-white p-1 flex items-center justify-center">
              <img src={heart} alt="like" />
            </div>

            {FavoriteCount}
          </div>
          <button onClick={handleShowComments} type="button">
            {comments.length} bình luận
          </button>
        </div>

        <hr />

        <div className="flex gap-3 mt-3 ml-5">
          <button
            className="flex gap-1 mobile:border-[#deb887] mobile:border mobile:bg-white bg-[#303030] py-2 px-5 rounded-[20px] hover:opacity-70 hover:transition-[0.3s]"
            type="button"
            onClick={() =>
              dispatch(addLikePost({ postId: PostID, userID: UserID }))
            }
          >
            <img
              className="w-[20px] h-[20px] transition"
              src={btnlike}
              alt="like"
            />
            {IsFavorited ? "Đã thích" : "Thích"}
          </button>

          <button
            className="flex gap-1 mobile:border-[#deb887] mobile:border mobile:bg-white bg-[#303030] py-2 px-5 rounded-[20px] hover:opacity-70 hover:transition-[0.3s]"
            type="button"
            onClick={handleShowComments}
          >
            Bình luận
          </button>
        </div>

        <Comments
          comments={{
            comentList: comments,
            onSubmitComment: handleSubmitComment,
            showComment: handleShowComments,
            commentRef,
            inputCommentRef,
          }}
        />
      </div>
    </li>
  );
};

export default PostItem;
