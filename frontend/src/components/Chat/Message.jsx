import React, { useState, useEffect, memo, useRef } from "react";
import { Chart } from "../Charts/Chart";
import Typewriter from "../Typewriter";
import { useDispatch, useSelector } from "react-redux";
import MiniLogo from "../../assets/images/mini-logo.png";
import { Clipboard, Star, Trash } from "react-feather";
import { deleteChat as deleteMsg } from "../../redux/slices/ChatSlice";
import { deleteMsg as deleteMsgAction } from "../../redux/actions/ChatActions";
import { handleCopy } from "../../utils/handleCopy";
import { notyf } from "../../utils/notyf";
import ModalComponent from "../Ui/ModalComponent";
import DeleteModal from "../Ui/DeleteModal";
import { formatBoldText } from "../../utils/formatBoldText";
import RatingButtons from "./RatingButtons";
import { hostName } from "../../api/config";
import { addPrompt } from "../../redux/slices/PromptSlice";
import { setPrompt } from "../../redux/actions/PromptActions";
import { isPromptExists } from "../../utils/isPromptExists";

const Message = ({ id, data, isUser, isLast }) => {
  const {
    content,
    execution_time,
    base64Image,
    chartData,
    chartType,
    likedByUser,
  } = data;
  const [openModal, setOpenModal] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const messageBoxRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { prompts } = useSelector((state) => state.prompt);
  console.log("Message Data", data);

  const handleDelete = (id) => {
    dispatch(deleteMsg(id));
    dispatch(deleteMsgAction({ msgId: id }))
      .unwrap()
      .then((resp) => console.log("resp", resp))
      .catch((err) => {
        notyf.error(err);
      });
  };
  const handleAddPrompt = (title) => {
    dispatch(setPrompt({ title }))
      .unwrap()
      .then(({ message, prompt }) => {
        dispatch(addPrompt(prompt));
        notyf.success(message);
      })
      .catch((err) => {
        console.log("SetPropmt err", err);
        notyf.error(err);
      });
  };
  const handleDeleteConfirmation = (confirmation) => {
    if (confirmation) {
      handleDelete(id);
    }
    setOpenModal(false);
  };
  return (
    <>
      <div
        // className="px-4 py-2 justify-center text-base md:gap-6 m-auto"
        // style={{ width: "calc(100% - 100px)" }}
        className={`px-4 py-2 justify-center text-base md:gap-6 max-w-[70%] w-[70%] ${
          isUser ? "self-start" : "self-end"
        }`}
      >
        <div
          // className={`flex flex-1 text-base p-4 gap-3 md:px-5 lg:px-4 xl:px-5  md:py-5 lg:py-4 xl:py-5 md:max-w-3xl group w-full ${
          //   isUser ? "bg-emerald-100 left-chat" : "bg-sky-100 right-chat"
          // } rounded-[28px] m-auto`}
          className={`flex flex-1 text-base mx-auto p-4 gap-3 md:px-5 lg:px-1 xl:px-5  rounded-[28px] group ${
            isUser ? "bg-user self-start" : "bg-bot"
          }`}
        >
          <div className="flex-shrink-0 flex flex-col relative items-end">
            <div>
              <div className="pt-0.5">
                <div className="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                  <div className="relative flex">
                    <img
                      alt="User"
                      loading="lazy"
                      width="24"
                      height="24"
                      decoding="async"
                      data-nimg="1"
                      className="rounded-sm"
                      src={
                        isUser ? `${hostName}/images/${user.image}` : MiniLogo
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col ">
            <div className="font-semibold select-none">
              {isUser ? user.username : `MAYA GPT`}
            </div>
            {execution_time && (
              <span className="text-sm my-1">({execution_time}s)</span>
            )}
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex flex-grow flex-col max-w-full">
                <div
                  // data-message-author-role="user"
                  // data-message-id="aaa202f4-b8bf-456c-9cbb-b327cd1137fc"
                  className="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto"
                >
                  <div className="">
                    {chartData && <Chart data={chartData} type={chartType} />}
                    <div className="my-2" ref={messageBoxRef}>
                      {isLast ? (
                        <Typewriter
                          text={content}
                          setShowActions={setShowActions}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: !isUser ? formatBoldText(content) : content,
                          }}
                          className="my-2"
                        />
                      )}
                    </div>
                    {isUser && (
                      <div className="flex gap-2 items-center">
                        {/* {isPromptExists(prompts, content) ? "True" : "False"} */}
                        <Clipboard
                          onClick={() => handleCopy(content)}
                          size={22}
                          className="hover:text-primary cursor-pointer"
                        />
                        <Star
                          onClick={() => {
                            if (!isPromptExists(prompts, content)) {
                              handleAddPrompt(content);
                            }
                          }}
                          size={22}
                          className={`${
                            isPromptExists(prompts, content)
                              ? "fill-yellow-400 text-yellow-400"
                              : "hover:text-yellow-400 cursor-pointer"
                          }`}
                        />
                      </div>
                    )}
                    {/* (!isLast || showChart) && */}
                    {(!isLast || showActions) && (
                      <div className="flex gap-2 items-center">
                        {!isUser && (
                          <Clipboard
                            onClick={() => handleCopy(content)}
                            size={22}
                            className="hover:text-primary cursor-pointer"
                          />
                        )}
                        {(likedByUser || likedByUser === 0) && (
                          <RatingButtons value={likedByUser} id={id} />
                        )}
                        {!isUser && (
                          <Trash
                            onClick={() => setOpenModal(true)}
                            size={21}
                            className="hover:text-error cursor-pointer"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <ModalComponent
          open={openModal}
          handleClose={() => setOpenModal(false)}
        >
          <DeleteModal
            handleDeleteConfirmation={handleDeleteConfirmation}
            // handleDelete={handleDeleteChat}
          />
        </ModalComponent>
      )}
    </>
  );
};

export default memo(Message);
