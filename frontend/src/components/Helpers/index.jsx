import { ThumbsUp, ThumbsDown, Octagon, XOctagon } from "react-feather";
export const Rating = ({ value }) => {
  console.log("rating value", value);
  if (value === 1) {
    return <ThumbsUp size={21} className={` text-success`} />;
    // return "like";
  }
  if (value === -1) {
    return <ThumbsDown size={21} className={`text-error`} />;
    // return "dislike";
  }
  if (value === 0) {
    return "-";
  }
};

export const IsTrash = ({ value }) => {
  return value ? (
    <XOctagon size={18} className={`text-error`} />
  ) : (
    <Octagon size={18} className={`text-success`} />
  );
};
