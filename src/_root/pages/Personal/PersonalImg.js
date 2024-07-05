import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Auth } from "../../../service/utils/auth";
import axios from "axios";
import config from "../../../configs/Configs.json";

const { URL_BASE64 } = config;

const PersonalImg = () => {
  const { userID } = new Auth();
  const [img, setimg] = useState(null);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const [listImg, setListImg] = useState([]);

  console.log(userID);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64Url = reader.result.split(",")[1];
      if (base64Url !== img) {
        setimg(base64Url);
        setIsChangeImage(true);
      }
    };
  };

  const handleAddImg = async () => {
    if (isChangeImage) {
      try {
        const response = await axios.post(
          "https://api.iudi.xyz/api/add_person_image",
          {
            idUser: userID,
            imageUrl: img,
          }
        );
        console.log("Image uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      setimg(null);
      setIsChangeImage(false);
    }
  };

  const handleCancel = () => {
    setimg(null);
    setIsChangeImage(false);
  };

  useEffect(() => {
    axios
      .get(`https://api.iudi.xyz/api/list_person_image/${userID}`)
      .then((res) => setListImg(res.data.data))
      .catch((error) => console.log(error));
  }, [listImg]);

  const listImg2 = showAllImages ? listImg : listImg.slice(0, 5);

  console.log(listImg);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex m-auto items-center gap-4">
        <div className="w-[180px] h-[180px] bg-[#262D34] border border-[#4EC957] rounded-xl relative">
          <input
            type="file"
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            onChange={handleImageChange}
          />
          <span className="flex items-center justify-center h-[100%]">
            <FaPlusCircle className="text-white" />
          </span>
          {img && (
            <img
              src={`${URL_BASE64}${img}`}
              alt="img"
              className="w-full h-full rounded-xl object-cover absolute top-0 left-0"
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddImg}
            className=" text-sm text-white rounded shadow bg-green px-11 py-4"
          >
            Thêm ảnh
          </button>

          <button
            onClick={handleCancel}
            className=" text-sm text-white rounded shadow border border-green px-11 py-4"
          >
            Huỷ
          </button>
        </div>
      </div>

      <div className="bg-[#262D34] border border-[#4EC957] rounded-xl p-4 flex flex-wrap gap-4 justify-around">
        {listImg2.map((img) => (
          <div className="w-[180px] h-[180px]" key={img.id}>
            <img
              src={`${URL_BASE64}${img.imageUrl}`}
              alt=""
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
        ))}

        {listImg.length > 8 && (
          <button
            className="text-blue-600"
            type="button"
            onClick={() => setShowAllImages(!showAllImages)}
          >
            {showAllImages ? <span>Ẩn bớt</span> : <span>Xem tất cả ảnh</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalImg;
