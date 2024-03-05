import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.css";
import ChatBox from "../../Chat/ChatBox.jsx";
import Header from "../Header/Header.jsx";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "../Sidebar/AdminSidebar.jsx";

const Main = () => {
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  return (
    <>
      {role === 305 ? <AdminSidebar /> : <Sidebar />}
      <div id="content">
        <Header />
        <main className="main-container">
          {/* <ChatBox /> */}
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
};

export default Main;
