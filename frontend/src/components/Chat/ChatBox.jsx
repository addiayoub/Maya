import React, { memo, useRef, useEffect } from "react";
import InputMessage from "./InputMessage";
import "./ChatBox.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loaders/Loader";
import Messages from "./Messages";
import ToggleSidebar from "./ToggleSidebar";
import ChatBoxHeader from "./ChatBoxHeader";
import { getChats } from "../../redux/actions/ChatActions";
import Dropdown from "../Test/DropDown";
import { Skeleton } from "@mui/material";
import ChatBoxLoader from "../Loaders/ChatBoxLoader";

const ChatBox = () => {
  const { loading, data, userInput, chats, getChatLoading } = useSelector(
    (state) => state.chat
  );
  console.log("data is", data);
  console.log("getChatLoading", getChatLoading);
  console.log("userInput is", userInput);
  console.log("chats is", chats);
  const chatboxRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // Scroll to the botton of the chatbox whenever chats change
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [chats]);

  return (
    <div
      className="chatbox flex flex-col relative overflow-auto"
      ref={chatboxRef}
    >
      <ChatBoxHeader />
      {/* <div className="flex-1 flex flex-col self-start w-full my-2"> */}
      {/* {data.length < 1 && (
          <h3 className="text-center">How can i help you ?</h3>
        )} */}
      {/* <Dropdown /> */}
      <Messages />
      {getChatLoading && <ChatBoxLoader />}

      {/* </div> */}
      <div className="w-full flex justify-center items-center">
        {loading && <Loader />}
      </div>
      <InputMessage />
    </div>
  );
};
export default memo(ChatBox);
