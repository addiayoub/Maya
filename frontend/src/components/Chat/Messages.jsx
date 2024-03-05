import React, { memo, useEffect, useState, useRef } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { ArrowDown, ChevronDown } from "react-feather";
const Messages = () => {
  const { chats, lastMsgId } = useSelector((state) => state.chat);
  const lastMsg = useRef(null);
  const msgsRef = useRef(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const msgsContainer = msgsRef.current;
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = msgsContainer;
      const maxScrollHeight = scrollHeight - clientHeight;
      const showBtn = scrollTop <= maxScrollHeight - 50;
      setShowBtn(showBtn);
    };
    msgsContainer?.addEventListener("scroll", handleScroll);
    return () => {
      msgsContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // const shouldHideSidebar = windowWidth < 992;
  useEffect(() => {
    // Scroll to the last message when component updates
    console.log("INIT");
    // if (lastMsg.current) {
    //   console.log("is true");
    //   lastMsg?.current?.scrollIntoView({ behavior: "smooth" });
    // }
    scrollToBtm();
  }, [chats]);
  const scrollToBtm = () => {
    console.log("lastMsg?.current", lastMsg?.current);
    lastMsg?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    // <div className="flex-1 flex flex-col self-start w-full my-2 overflow-auto">
    <div className=" w-full overflow-y-auto" ref={msgsRef}>
      <div className="px-4 py-2 justify-center text-base m-auto">
        <div className="flex-1 flex flex-col self-start w-full my-2">
          {chats.length > 0 && (
            <div
              className="flex flex-col gap-4 px-4 py-2 justify-center text-base md:gap-2 m-auto w-full"
              // style={{ width: "calc(100% - 115px)" }}
            >
              {chats.map((item, index) => {
                console.log("messages Chats map", chats);

                const { data, isUser } = item;
                return isUser ? (
                  <Message
                    isUser
                    content={data.content}
                    key={item._id ?? index}
                  />
                ) : (
                  <Message
                    key={item._id}
                    id={item._id}
                    content={data.content}
                    execution_time={data.execution_time}
                    base64Image={data.base64Image}
                    chartData={data.chartData}
                    chartType={data.chartType}
                    likedByUser={data.likedByUser}
                    isLast={
                      chats.length - 1 === index && item._id === lastMsgId
                    }
                  />
                );
              })}
              <div ref={lastMsg}></div>
            </div>
          )}
        </div>
      </div>
      {showBtn && (
        <button
          className="cursor-pointer absolute right-1/2 z-[1] rounded-full bg-clip-padding bottom-[90px] shadow-xl border border-muted border-solid bg-white p-1"
          onClick={scrollToBtm}
        >
          <ArrowDown size={24} color="#424242" />
        </button>
      )}
    </div>
  );
};

export default memo(Messages);
