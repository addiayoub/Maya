import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/Table";
import { getMsgsColumns } from "./columns";
import ModalComponent from "../../components/Ui/ModalComponent";
import { Box, IconButton, Typography } from "@mui/material";
import { Clipboard } from "react-feather";
import { formatBoldText } from "../../utils/formatBoldText";
import { handleCopy } from "../../utils/handleCopy";
import { transformUsersData } from "../../utils/admin";
import { IsTrash, Rating } from "../../components/Helpers";
const dd = [
  {
    username: "Younes",
    chats: [
      {
        title: "Chat 92",
        isDeleted: false,
        _id: "65e59ed7ae04fff64355b4d0",
        messages: [
          {
            isUser: true,
            data: {
              content: "bonjour",
            },
            isDeleted: false,
            _id: "65e59edcae04fff64355b6c6",
            timestamp: "2024-03-04T10:13:48.595Z",
          },
          {
            isUser: false,
            data: {
              content: "0",
              execution_time: 2,
              base64Image: null,
              likedByUser: 0,
            },
            isDeleted: false,
            _id: "65e59edcae04fff64355b6c7",
            timestamp: "2024-03-04T10:13:48.596Z",
          },
        ],
      },
    ],
  },
  // more users
];

const MessagesTable = () => {
  const {
    users: { data, loading, error },
  } = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState({
    state: false,
    payload: null,
  });
  const containerRef = useRef(null);
  console.log("open", open);
  useEffect(() => {
    const newData = transformUsersData(data);
    setRows(newData);
    console.log("userEffect");
  }, [data]);
  console.log("rows", rows);
  const columns = getMsgsColumns(setOpen);
  return (
    <div>
      <h3>Messages Table</h3>
      <Table rows={rows} columns={columns} pageSize={100} />
      {open.state && (
        <ModalComponent
          open={open.state}
          handleClose={() => setOpen({ state: false, payload: null })}
          withHeader
          headerText="Younes"
          style={{
            maxHeight: 400,
            minHeight: 300,
            width: 500,
          }}
        >
          <Box className="" ref={containerRef}>
            <Box className="mt-2 mb-3 flex flex-col gap-1">
              <span
                className={`block rounded-lg ${
                  open?.payload.isUser ? "bg-emerald-200" : "bg-sky-200"
                } max-w-[60px] text-center p-1`}
              >
                {open?.payload.isUser ? "Input" : "Output"}
              </span>

              <Box className="flex gap-2 flex-wrap items-center">
                <Typography className="font-medium leading-5">Chat:</Typography>
                <Typography>{open?.payload.chat.title}</Typography>
                <IsTrash value={open?.payload.chat.isDeleted} />
              </Box>
              <Box className="flex gap-2 flex-wrap items-center">
                <Typography className="font-medium leading-5">
                  Message:{" "}
                </Typography>

                <IsTrash value={open?.payload.message.isDeleted} />
              </Box>
              {!open?.payload.isUser && (
                <Box className="flex flex-wrap gap-2 items-center">
                  <Typography className="font-medium leading-5">
                    Feedback:
                  </Typography>
                  <Rating value={open?.payload.message.isLiked} />
                </Box>
              )}
            </Box>
            <Box className="relative max-h-[210px] overflow-auto leading-7">
              <IconButton
                className="sticky left-[100%] top-0 bg-slate-100 transition ease-in-out opacity-75 hover:opacity-100 "
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(
                    open?.payload.message.content,
                    containerRef.current
                  );
                }}
              >
                <Clipboard
                  size={18}
                  className=" opacity-75 transition ease-in-out hover:scale-150 hover:opacity-100 hover:text-primary"
                />
              </IconButton>
              <div
                dangerouslySetInnerHTML={{
                  __html: !open?.payload.isUser
                    ? formatBoldText(open?.payload.message.content)
                    : open?.payload.message.content,
                }}
              />
            </Box>
          </Box>
        </ModalComponent>
      )}
    </div>
  );
};

export default MessagesTable;
