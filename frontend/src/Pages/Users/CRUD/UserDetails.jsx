import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { Mail, MessageCircle, ThumbsDown, ThumbsUp, User } from "react-feather";
import ModalComponent from "../../../components/Ui/ModalComponent";
import { hostName } from "../../../api/config";
import { messagesStats } from "../../../utils/admin";

const UserDetails = ({ data, setModalOff }) => {
  const { state, payload } = data;
  return (
    <ModalComponent
      open={state}
      withHeader
      headerText={payload.username}
      handleClose={setModalOff}
      style={{ maxWidth: "550px" }}
    >
      <Box className="mx-8 min-w-[390px] py-[10px] flex items-center justify-between">
        <Box className="">
          <img
            src={`${hostName}/images/${payload.image}`}
            className="select-none m-auto max-w-[150px] max-h-[150px] w-[150px] h-[150px] rounded-full"
          />
        </Box>
        <Box>
          <Box className="flex gap-4 items-center mb-1">
            <User size={22} color="var(--primary-color)" />
            <Typography className="select-none font-semibold">
              {payload.isAdmin ? "Admin" : "User"}
            </Typography>
          </Box>
          <Box className="flex gap-4 items-center  mb-1">
            <MessageCircle size={22} color="var(--primary-color)" />
            <Box className="select-none font-semibold flex gap-1">
              <Typography className="font-semibold">Deleted Chats:</Typography>
              <Typography className="font-semibold">
                {payload.chats.filter((chat) => chat.isDeleted).length}
              </Typography>
            </Box>
          </Box>
          <Box className="flex gap-4 items-center  mb-1">
            <Mail size={22} color="var(--primary-color)" />
            <Box className="select-none font-semibold flex gap-1">
              <Typography className="font-semibold">
                Deleted Messages:
              </Typography>
              <Typography className="font-semibold">
                {messagesStats(payload).deletedMessagesCount}
              </Typography>
            </Box>
          </Box>
          <Box className="flex gap-4 items-center  mb-1">
            <ThumbsUp size={22} color="var(--success-color)" />
            <Box className="select-none font-semibold flex gap-1">
              <Typography className="font-semibold">Liked Messages:</Typography>
              <Typography className="font-semibold">
                {messagesStats(payload).likedMessagesCount}
              </Typography>
            </Box>
          </Box>
          <Box className="flex gap-4 items-center mb-1">
            <ThumbsDown size={22} color="var(--error-color)" />
            <Box className="select-none font-semibold flex gap-1">
              <Typography className="font-semibold">
                Unliked Messages:
              </Typography>
              <Typography className="font-semibold">
                {messagesStats(payload).unlikedMessagesCount}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ModalComponent>
  );
};

export default memo(UserDetails);
