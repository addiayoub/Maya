import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.css";
import ChatBox from "../../Chat/ChatBox.jsx";
import Header from "../Header/Header.jsx";

const Main = () => {
  return (
    <>
      <Sidebar />
      <div id="content">
        <Header />
        <main className="main-container">
          <ChatBox />
        </main>
      </div>
    </>
  );
};

export default Main;
