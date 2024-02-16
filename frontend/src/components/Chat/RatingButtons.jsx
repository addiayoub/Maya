import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeDislikeChat } from "../../redux/actions/ChatActions";
import { handleLikeDislike } from "../../redux/slices/ChatSlice";
import { ThumbsUp, ThumbsDown } from "react-feather";

const RatingButtons = ({ value, id }) => {
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
export default memo(RatingButtons);
