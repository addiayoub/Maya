import React, { memo, useEffect, useState, useRef } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { ArrowDown } from "react-feather";
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
  useEffect(() => {
    // Scroll to the last message when component updates
    scrollToBtm();
  }, [chats]);
  const scrollToBtm = () => {
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
                console.log("Chats map:", chats);
                const { input, output } = item;
                return (
                  <React.Fragment key={item._id ?? index}>
                    {input && (
                      <Message isUser content={input.content} data={input} />
                    )}
                    {output && (
                      <Message
                        id={item._id}
                        data={output}
                        // content={output.content}
                        // execution_time={output.execution_time}
                        // base64Image={output.base64Image}
                        // chartData={output.chartData}
                        // chartType={output.chartType}
                        // likedByUser={output.likedByUser}
                        isLast={
                          chats.length - 1 === index && item._id === lastMsgId
                        }
                      />
                    )}
                  </React.Fragment>
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
