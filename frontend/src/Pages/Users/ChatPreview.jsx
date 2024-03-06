import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { IsTrash, Rating } from "../../components/Helpers";
import { formatBoldText } from "../../utils/formatBoldText";
import { Clipboard, X } from "react-feather";
import { hostName } from "../../api/config";
import { handleCopy } from "../../utils/handleCopy";
import "./ChatPreview.css";

const ChatPreview = ({ open, handleClose }) => {
  const { payload, state } = open;
  console.log("ChatPreview open", open);
  return (
    <Box className={`rounded-lg chatpreview ${state ? "show" : "hide"}`}>
      <Box className="flex justify-end">
        <IconButton onClick={handleClose}>
          <X className="text-error" />
        </IconButton>
      </Box>
      {state && (
        <Box className="overflow-auto h-full max-h-[370px]" s>
          <Box className="mt-2 mb-3 flex flex-col gap-1">
            <Box className="flex gap-2 flex-wrap items-center">
              <Typography className="font-medium leading-5">Chat:</Typography>
              <Typography>{payload.chat.title}</Typography>
              <IsTrash value={payload.chat.isDeleted} />
            </Box>
            <Box className="flex gap-2 flex-wrap items-center">
              <Typography className="font-medium leading-5">
                Message:{" "}
              </Typography>

              <IsTrash value={payload.message.isDeleted} />
            </Box>
            <Box className="flex flex-wrap gap-2 items-center">
              <Typography className="font-medium leading-5">
                Feedback:
              </Typography>
              <Rating value={payload.message.isLiked} />
            </Box>
          </Box>
          <Box className="flex flex-col gap-2 px-2 py-1 justify-center text-base md:gap-1 m-auto w-full">
            {/* INPUT */}
            <div className="px-2 py-1 justify-center text-base md:gap-3 max-w-[70%] w-[70%] self-start">
              <div className="flex flex-1 text-base mx-auto p-4 gap-3 md:px-5 lg:px-1 xl:px-5  rounded-[28px] group bg-user self-start">
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
                            src={`${hostName}/images/${payload.user.profile}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex w-full flex-col ">
                  <div className="font-semibold select-none">
                    {payload.user.username}
                  </div>
                  <div className="flex-col gap-1 md:gap-3">
                    <div className="flex flex-grow flex-col max-w-full">
                      <div className="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto">
                        <div className="">
                          <div className="my-2">
                            <div className="my-1">
                              {payload.message.input.content}
                            </div>
                          </div>
                          <Copy content={payload.message.input.content} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* OUTPUT */}
            <div className="px-2 py-1 justify-center text-base md:gap-3 max-w-[70%] w-[70%] self-end">
              <div className="flex flex-1 text-base mx-auto p-4 gap-3 md:px-5 lg:px-1 xl:px-5  rounded-[28px] group bg-bot">
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
                            src="/src/assets/images/mini-logo.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex w-full flex-col ">
                  <div className="font-semibold select-none">MAYA GPT</div>
                  <span className="text-sm my-1">
                    ({payload.message.output.execution_time}s)
                  </span>
                  <div className="flex-col gap-1 md:gap-3">
                    <div className="flex flex-grow flex-col max-w-full">
                      <div className="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto">
                        <div className="">
                          <div className="my-2">
                            <div className="my-2">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: formatBoldText(
                                    payload.message.output.content
                                  ),
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <Copy content={payload.message.output.content} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatPreview;

const Copy = ({ content }) => {
  return (
    <div class="flex gap-2 items-center ">
      <Clipboard
        class="hover:text-primary cursor-pointer"
        size={20}
        onClick={() => handleCopy(content)}
      />
    </div>
  );
};
