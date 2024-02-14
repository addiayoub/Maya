import React, { useState, useEffect, memo } from "react";
import { Chart } from "../Charts/Chart";
import Typewriter from "../Typewriter";
import { useDispatch, useSelector } from "react-redux";
import MiniLogo from "../../assets/images/mini-logo.png";
import Avatar from "../../assets/images/avatar.png";
import { Clipboard, Heart, ThumbsDown, ThumbsUp, Trash } from "react-feather";
import { IconButton } from "@mui/material";
import { deleteChat, handleLikeDislike } from "../../redux/slices/ChatSlice";
import { deleteMsg, likeDislikeChat } from "../../redux/actions/ChatActions";
import { handleCopy } from "../../utils/handleCopy";
import { notyf } from "../../utils/notyf";
import ModalComponent from "../Ui/ModalComponent";
import DeleteModal from "../Ui/DeleteModal";
import { formatBoldText } from "../../utils/formatBoldText";

const DefineRate = ({ value, id }) => {
  const { chats } = useSelector((state) => state.chat);
  console.log("your chats", chats);
  console.log("rateValue is", value);
  const dispatch = useDispatch();
  const handleClick = (value) => {
    dispatch(handleLikeDislike({ id, value }));
    dispatch(likeDislikeChat({ msgId: id, value }));
  };
  return (
    <div className="flex gap-3 m-1 items-center">
      <ThumbsUp
        size={21}
        // color={value === 1 ? "green" : "currentColor"}
        className={`cursor-pointer text-success hover:text-gray hover:fill-success  hover:scale-110 ${
          value === 1 ? "fill-success" : ""
        }`}
        onClick={() => handleClick(1)}
      />
      <ThumbsDown
        size={21}
        className={`cursor-pointer text-error hover:text-gray hover:fill-error  hover:scale-110 ${
          value === -1 ? "fill-error" : ""
        }`}
        // color={value === -1 ? "red" : "currentColor"}
        onClick={() => handleClick(-1)}
      />
    </div>
  );
};

const Message = ({
  isUser,
  content,
  execution_time,
  base64Image,
  chartData,
  chartType,
  likedByUser,
  isLast,
  id,
}) => {
  const [showChart, setShowChart] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  content = !isUser ? formatBoldText(content) : content;
  const dispatch = useDispatch();
  console.log("isLiked", likedByUser);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const typingDuration = content.length * 60;
    const chartTimeout = setTimeout(() => {
      setShowChart(true);
    }, typingDuration);

    return () => {
      clearTimeout(chartTimeout);
    };
  }, [content]);

  console.log("content from message", isUser, content);

  const handleDelete = (id) => {
    dispatch(deleteChat(id));
    dispatch(deleteMsg({ msgId: id }))
      .unwrap()
      .then((resp) => console.log("resp", resp))
      .catch((err) => {
        notyf.error(err);
      });
  };
  const handleDeleteConfirmation = (confirmation) => {
    console.log("confirma", confirmation);
    if (confirmation) {
      handleDelete(id);
    }
    setOpenModal(false);
  };
  return (
    <div
      className="px-4 py-2 justify-center text-base md:gap-6 m-auto"
      style={{ width: "calc(100% - 100px)" }}
    >
      <div
        className={`flex flex-1 text-base p-4 gap-3 md:px-5 lg:px-4 xl:px-5  md:py-5 lg:py-4 xl:py-5 md:max-w-3xl group w-full ${
          isUser ? "bg-emerald-100" : "bg-sky-100 "
        } rounded-[28px] m-auto`}
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
                    src={isUser ? Avatar : MiniLogo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex w-full flex-col ">
          <div className="font-semibold select-none">
            {isUser ? user.name : `MAYA GPT`}
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
                  {/* {base64Image && (
                    <img
                      src={`data:image/png;base64,${base64Image}`}
                      alt="Base64 Image"
                      width="100%"
                      height: '600'
                    />
                  )} */}
                  {/* {isUser ? content : <Typewriter text={content} />} */}
                  {/* {isUser ? content : content} */}
                  {chartData && <Chart data={chartData} type={chartType} />}
                  {/* <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="my-2"
                  /> */}
                  <div className="my-2">
                    {isLast ? <Typewriter text={content} /> : content}
                  </div>

                  {/* {base64Image && chartData && chartType === "trading" && (
                    <img
                      src={`data:image/png;base64,${base64Image}`}
                      alt="chart-image"
                      width="100%"
                      height="600"
                    />
                  )} */}

                  {/* <ThumbsUp fill="green" size={18} />
                  <ThumbsDown fill="red" size={18} /> */}
                  {/* <h3>{id}</h3>
                  <h3>{likedBuUser}</h3> */}

                  {showChart && (
                    <div className="flex gap-2 items-center">
                      {!isUser && (
                        <Clipboard
                          onClick={() => handleCopy(content)}
                          size={22}
                          className="hover:text-primary cursor-pointer"
                        />
                      )}
                      {(likedByUser || likedByUser === 0) && (
                        <DefineRate value={likedByUser} id={id} />
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
      <ModalComponent open={openModal} handleClose={() => setOpenModal(false)}>
        <DeleteModal
          handleDeleteConfirmation={handleDeleteConfirmation}
          // handleDelete={handleDeleteChat}
        />
      </ModalComponent>
    </div>
  );
};

export default memo(Message);
