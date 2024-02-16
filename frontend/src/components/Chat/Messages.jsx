import React, { memo, useEffect, useRef } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
const Messages = () => {
  const { chats, lastMsgId } = useSelector((state) => state.chat);
  console.log("lastMsgId", lastMsgId);
  const lastMsg = useRef(null);
  useEffect(() => {
    // Scroll to the last message when component updates
    if (lastMsg.current) {
      lastMsg?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);
  return (
    // <div className="flex-1 flex flex-col self-start w-full my-2 overflow-auto">
    <div className="w-full overflow-y-auto">
      <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
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
    </div>
  );
};

export default memo(Messages);
