import React, { memo, useState } from "react";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/slices/AuthSlice";
import { notyf } from "../../../utils/notyf";
import "./Header.css";
import {
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  User,
} from "react-feather";
import { toggleSidebar, setLang } from "../../../redux/slices/LayoutSlice";
import { hostName } from "../../../api/config";
import ModalComponent from "../../Ui/ModalComponent";
import Profile from "../../Users/Profile";
import { resetChatSlice } from "../../../redux/slices/ChatSlice";
import UK from "../../../assets/images/united-kingdom-flag-icon.svg";
import AR from "../../../assets/images/saudi-arabia-flag-icon.svg";
import FR from "../../../assets/images/france-flag-icon.svg";
import Languages from "../../Languages";

function Header() {
  const { isOpen, lang } = useSelector((state) => state.layout);
  const [openProfile, setOpenProfile] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handelLogout = (e) => {
    e.preventDefault();
    dispatch(resetChatSlice());
    dispatch(logout());
    localStorage.clear();
    notyf.success("Vous avez été déconnecté avec succès.");
  };
  const getActiveLang = (l) => {
    return l === lang;
  };
  return (
    <>
      <header className="header">
        <div
          className={`menu-icon ${
            isOpen ? "opened" : "closed"
          }  toggle-sidebar`}
        >
          <IconButton onClick={() => dispatch(toggleSidebar(!isOpen))}>
            {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </IconButton>
        </div>
        <div className="header-right">
          {/* <ToggleTheme /> */}
          <Languages />
          {/* {user.role !== 305 && (
            <div className="lang-container">
              <div
                className={`lang ${getActiveLang("eng") ? "active" : ""}`}
                onClick={() => dispatch(setLang("eng"))}
              >
                <img src={UK} width={22} height={22} />
              </div>
              <div
                className={`lang ${getActiveLang("fr") ? "active" : ""}`}
                onClick={() => dispatch(setLang("fr"))}
              >
                <img src={FR} width={22} height={22} />
              </div>
              <div
                className={`lang ${getActiveLang("ar") ? "active" : ""}`}
                onClick={() => dispatch(setLang("ar"))}
              >
                <img src={AR} width={22} height={22} />
              </div>
            </div>
          )} */}
          <div
            className="profile"
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          >
            <div className="profile-icons">
              {/* <User size={22} /> */}
              <div className="profile-icon w-[30px] h-[30px] rounded-[50%] overflow-hidden">
                <img
                  src={`${hostName}/images/${user.image}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="user" id="user">
                {user.username}
              </span>
              <IconButton sx={{ padding: 0 }}>
                {isOpenDropdown ? (
                  <ChevronUp
                    size={22}
                    // color={`${theme.darkTheme ? "#fff" : "#373736"}`}
                  />
                ) : (
                  <ChevronDown
                    size={22}
                    // color={`${theme.darkTheme ? "#fff" : "#373736"}`}
                  />
                )}
              </IconButton>
            </div>
            <ul className={`profile-links ${isOpenDropdown ? "show" : ""}`}>
              <li>
                <Link to={null} onClick={() => setOpenProfile(true)}>
                  <User size="25" />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/logout" onClick={handelLogout}>
                  <LogOut size={22} />
                  Déconnexion
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {openProfile && (
        <ModalComponent
          open={openProfile}
          handleClose={() => setOpenProfile(false)}
          withHeader
          headerText={`Profile`}
        >
          <Profile />
        </ModalComponent>
      )}
    </>
  );
}

export default memo(Header);
