import React, { memo, useState } from "react";
import "./InputMessage.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserInput } from "../../redux/slices/ChatSlice";
import useHandleGenerate from "../../Hooks/useHandleGenerate";
import { Tooltip } from "@mui/material";
const InputMessage = () => {
  const [message, setMessage] = useState("");
  const { handleGenerate } = useHandleGenerate();
  const { userInput } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  // const handleGenerate = () => {
  //   console.log("msg");
  //   dispatch(setChat({ isUser: true, data: { content: message } }));
  //   dispatch(setUserInput(message));
  //   dispatch(getData({ message }))
  //     .unwrap()
  //     .then((successValue) => {
  //       console.log("successValue", successValue);
  //       const { isUser, data } = successValue;
  //       dispatch(setChat({ isUser, data }));
  //     })
  //     .catch((error) => console.log(error));
  //   setMessage("");
  // };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("userInput", userInput);
      onClickHandler();
    }
  };
  const onClickHandler = async () => {
    try {
      await handleGenerate(userInput);
      // Handle success
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  return (
    <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)] sticky left-0 top-0 z-10 bg-white">
      <div className="flex w-full items-center relative ">
        <div className="message overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full dark:border-token-border-heavy flex-grow border border-token-border-heavy dark:text-white rounded-2xl bg-white dark:bg-gray-800 shadow-[0_0_0_2px_rgba(255,255,255,0.95)] dark:shadow-[0_0_0_2px_rgba(52,53,65,0.95)] bottom-0 left-0">
          <textarea
            // onChange={(e) => setMessage(e.target.value)}
            onChange={(e) => dispatch(setUserInput(e.target.value))}
            id="prompt-textarea"
            tabIndex="0"
            data-id="root"
            rows="1"
            onKeyDown={handleKeyDown}
            value={userInput}
            placeholder="Message MAYAGPT…"
            className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10  dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"
            // style={{ maxHeight: "200px", height: "652px" }}
          ></textarea>
          <Tooltip arrow title="Envoyer un message" placement="top">
            <span className="absolute md:bottom-3 md:right-3 right-2">
              <button
                className="bg-black  dark:hover:bg-white  disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors flex items-center justify-center"
                onClick={onClickHandler}
                disabled={!userInput}
                data-testid="send-button"
              >
                <span className="" data-state="closed">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white dark:text-black"
                  >
                    <path
                      d="M7 11L12 6L17 11M12 18V7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default memo(InputMessage);
