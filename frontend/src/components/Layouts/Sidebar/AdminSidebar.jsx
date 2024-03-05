import React, { memo, useEffect, useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/images/Logo.png";
import { toggleSidebar } from "../../../redux/slices/LayoutSlice";
import SidebarLoader from "../../Loaders/SidebarLoader";

const AdminSidebar = () => {
  const { isOpen } = useSelector((state) => state.layout);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const shouldHideSidebar = windowWidth < 992;
  useEffect(() => {
    if (shouldHideSidebar) {
      dispatch(toggleSidebar(false));
    } else {
      dispatch(toggleSidebar(true));
    }
  }, [shouldHideSidebar]);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <aside className={`side-menu ${!isOpen ? "hide" : ""}`} id="sidebar">
        <div className="sidebar-header">
          <img src={Logo} alt="ida-tech-logo" className="logo" />
        </div>
        <div className="sidebar-body p-2 overflow-y-auto">
          <ul className="side-menu ">{isLoading && <SidebarLoader />}</ul>
        </div>
      </aside>
    </>
  );
};

export default memo(AdminSidebar);
