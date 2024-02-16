import { IconButton } from "@mui/material";
import React, { memo, useState } from "react";
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
  UserCheck,
  User,
} from "react-feather";
import { toggleSidebar } from "../../../redux/slices/LayoutSlice";

function Header() {
  const { isOpen } = useSelector((state) => state.layout);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  // const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handelLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    notyf.success("Vous avez été déconnecté avec succès.");
  };
  return (
    <header className="header">
      <div
        // className={`menu-icon ${isOpen ? "opened" : "closed"}  toggle-sidebar`}
        className={`menu-icon toggle-sidebar`}
      >
        <IconButton onClick={() => dispatch(toggleSidebar(!isOpen))}>
          {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
        </IconButton>
      </div>
      <div className="header-right">
        {/* <ToggleTheme /> */}
        <div
          className="profile"
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
        >
          <div className="profile-icons">
            <User size={22} />
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
            {/* <li> */}
            {/* <Link to="/profile"> */}
            {/* <User size="25" /> */}
            {/* Profile */}
            {/* </Link> */}
            {/* </li> */}
            <li>
              <Link to="/logout" onClick={handelLogout}>
                <LogOut size={22} />
                Déconnecion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
