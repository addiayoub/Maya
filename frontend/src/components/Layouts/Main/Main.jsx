import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.css";
import ChatBox from "../../Chat/ChatBox.jsx";
import Header from "../Header/Header.jsx";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Sidebar />
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
