import React, { useRef, useState } from "react";

import CommentItem from "./CommentItem";

import { FaChevronDown } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const Comments = ({ comments }) => {
  const { comentList, commentRef, inputCommentRef, onSubmitComment } = comments;

  const refUlElement = useRef();
  const refIcondown = useRef();

  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (data) => {
    inputCommentRef.current.value += data.emoji;
    setShowEmoji(false);
    console.log(inputCommentRef.current.value);
  };

  return (
    <div id="comment-list" className="hidden duration-200" ref={commentRef}>
      {comentList.length > 0 ? (
        <div>
          <div>
            <button
              //    onClick={() => {
              //     const isHidden = refUlElement.current.classList.contains('hidden')

              //     if (isHidden) {
              //      refUlElement.current.classList.remove('hidden')
              //      refIcondown.current.style.transform = 'rotate(0)'

              //      return
              //     }

              //     refUlElement.current.classList.add('hidden')
              //     refIcondown.current.style.transform = 'rotate(180deg)'
              //    }}
              className="flex gap-2 items-center my-3"
              type=""
            >
              <p>Bình luận liên quan nhất</p>
              <div ref={refIcondown}>
                <FaChevronDown />
              </div>
            </button>
          </div>

          <ul ref={refUlElement} className="transition-all duration-200">
            {comentList.map(
              ({
                FavoriteCount,
                CommentID,
                FullName,
                Content,
                CommentUpdateTime,
                IsFavorited,
                UserID,
                PostID,
                Avatar,
              }) => {
                const imgRef = React.createRef();

                return (
                  <CommentItem
                    key={CommentID}
                    data={{
                      FavoriteCount,
                      CommentID,
                      FullName,
                      Content,
                      CommentUpdateTime,
                      IsFavorited,
                      UserID,
                      PostID,
                      Avatar,
                      imgRef,
                    }}
                  />
                );
              }
            )}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div>
        <form
          onSubmit={onSubmitComment}
          className="flex mobile:border-[#deb887] items-center justify-center p-5 border bg-white text-black h-[60px] rounded-[20px] mt-5"
        >
          <input
            className="w-full mr-5 focus-visible:outline-none  "
            type="text"
            placeholder="Viết bình luận..."
            ref={inputCommentRef}
          />

          <div className="flex gap-3">
            <div className="relative">
              <button
                type="button"
                className="flex"
                onClick={() => setShowEmoji(!showEmoji)}
              >
                <MdEmojiEmotions className="size-7" />
              </button>

              {showEmoji && (
                <div className="absolute bottom-[100%] mobile:right-[-50px] right-0 text-[18px]">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <button type="submit" className="text-[30px]">
              <IoMdSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
