import config from "../../../configs/Configs.json";
import { useSelector } from "react-redux";
import { messagesSelector } from "../../../service/redux/messages/messagesSlice";
import { handleErrorImg } from "../../../service/utils/utils";
import { Auth } from "../../../service/utils/auth";
import {
  LockClosedIcon,
  LockOpenIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const { URL_BASE64 } = config;

const MessageBlock = () => {
  const { historyMessages, isSeenMessage } = useSelector(messagesSelector);

  const { userID } = new Auth();

  const handleBlock = async (relatedUserID) => {
    try {
      const response = await axios.post(
        `https://api.iudi.xyz/api/profile/setRelationship/${userID}`,
        {
          RelatedUserID: relatedUserID,
          RelationshipType: "block",
        }
      );
      toast.success("Chặn người dùng thành công!");
      console.log("User blocked:", response.data);
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Có lỗi xảy ra khi chặn người dùng.");
    }
  };

  const handleUnBlock = async (relatedUserID) => {
    try {
      const response = await axios.post(
        `https://api.iudi.xyz/api/profile/setRelationship/${userID}`,
        {
          RelatedUserID: relatedUserID,
          RelationshipType: "other",
        }
      );
      toast.success("Bỏ chặn người dùng thành công!");
      console.log("User unblocked:", response.data);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi bỏ chặn người dùng.");
    }
  };

  return (
    <>
      <ToastContainer />
      <ul className="grid grid-cols-2 gap-3 mx-5 pt-5 overflow-y-auto">
        {historyMessages.map(
          ({
            Content,
            OtherUsername,
            OtherAvatar,
            OtherUserID,
            IsSeen,
            SenderID,
            Image,
          }) => {
            return (
              <li>
                <div className="flex items-center justify-between cursor-pointer bg-[#4A5561] rounded-[40px]">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-[60px] h-[60px] m-2 tablet:w-[50px] tablet:h-[50px] rounded-full object-cover border-2 border-white"
                      src={`${URL_BASE64}${OtherAvatar}`}
                      alt={`avatar ${OtherUsername}`}
                      onError={(e) => handleErrorImg(e.target)}
                    />

                    <div>
                      <h3 className="capitalize text-[18px] text-white tablet:text-lg font-medium">
                        {OtherUsername}
                      </h3>

                      {Image && (
                        <img
                          className="w-[30px] h-[30px] object-cover rounded"
                          src={`${URL_BASE64}${Image}`}
                          alt="message"
                        />
                      )}

                      {Content && (
                        <p
                          className={`text-[16px] tablet:text-sm ${
                            IsSeen === 1 ||
                            isSeenMessage ||
                            SenderID === parseInt(userID)
                              ? "text-gray-500"
                              : "text-white"
                          }`}
                        >
                          {Content}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <span
                      onClick={() => handleBlock(OtherUserID)}
                      className="text-red-800 w-6 mr-3"
                    >
                      <LockClosedIcon />
                    </span>
                    <span
                      onClick={() => handleUnBlock(OtherUserID)}
                      className="text-red-800 w-6 mr-3"
                    >
                      <LockOpenIcon />
                    </span>
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
};

export default MessageBlock;
