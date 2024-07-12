import React, { useEffect, useRef, useState } from "react";

import { useParams, useLocation } from "react-router-dom";

import Header3 from "../../../components/Header/Header3";
import SideBarGroup from "./SidebarGroup/SideBarGroup";
import background from "../../../images/background.jpg";
import GroupImages from "./GroupImages/GroupImages";
import GroupDetail from "./GroupDetail/GroupDetail";

import { handleErrorImgSlideGroup } from "../../../service/utils/utils";

import config from "../../../configs/Configs.json";
const { URL_BASE64 } = config;

const Group = () => {
  const [heightHeader, setHeightHeader] = useState(100);
  const [widthSidebar, setWidthSidebar] = useState(500);
  const [isLoadingSidebar, setIsLoadingSidebar] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const sidebarRef = useRef();

  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    minHeight: "100vh",
  };

  const sidebarStyles = {
    position: "fixed",
    top: `${heightHeader}px`,
    left: "0",
    height: `calc(100vh - ${heightHeader}px)`,
  };

  const mainStyles = {
    width: `calc(100% - ${widthSidebar}px)`,
    marginLeft: `${widthSidebar}px`,
    marginTop: `${heightHeader}px`,
  };

  const { state } = useLocation();
  const { avatarLink, groupName } = state;

  useEffect(() => {
    setTimeout(() => {
      isLoadingSidebar && setWidthSidebar(sidebarRef?.current.offsetWidth);
    }, 300);
  }, [isLoadingSidebar]);

  const handleGetHeightHeder = (number) => setHeightHeader(number);
  const getIsLoadingSidebar = (value) => setIsLoadingSidebar(value);

  useEffect(() => {
    window.onscroll = () => {
      document.documentElement.scrollTop > 0
        ? setIsDark(true)
        : setIsDark(false);
    };
  }, []);

  return (
    <>
      <div
        className="flex flex-col justify-between w-full mobile:hidden "
        style={backgroundImageStyle}
      >
        <Header3 isDark={isDark} onGetHeight={handleGetHeightHeder} />
        <div>
          <div
            ref={sidebarRef}
            style={sidebarStyles}
            id="sidebar-group"
            className="p-5 overflow-y-auto overflow-x-hidden ipad:w-[150px] max-w-[300px] lg:max-w-[400px] w-max mobile:hidden"
          >
            <SideBarGroup onLoading={getIsLoadingSidebar} />
          </div>

          <div style={mainStyles} className="text-white p-5">
            <div>
              <div>
                <img
                  className="w-full object-cover max-h-[400px]"
                  src={`${URL_BASE64}${avatarLink}`}
                  alt="slide group"
                  onError={(e) => handleErrorImgSlideGroup(e.target)}
                />
              </div>

              <div className="flex justify-between bg-[#008748] p-3 items-center">
                <div>
                  <h3 className="text-xl ipad:text-lg capitalize">
                    {groupName}
                  </h3>
                  <p className="text-[#bdbdbd] text-sm">367 thành viên</p>
                </div>

                <div className="mr-5">
                  <button
                    type="button"
                    className=" text-sm bg-[#4EC957] p-2 rounded-[6px]"
                  >
                    Tham gia nhóm
                  </button>
                  <button
                    type="button"
                    className="ml-3 text-sm bg-[#FF685F] p-2 rounded-[6px]"
                  >
                    Rời nhóm
                  </button>
                </div>
              </div>
            </div>

            <div className="grid 2xl:grid-cols-2 grid-cols-1 py-5 gap-3">
              <GroupDetail />
              <GroupImages />
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="hidden mobile:block">
        <GroupDetail />
      </div>
    </>
  );
};
export default Group;
