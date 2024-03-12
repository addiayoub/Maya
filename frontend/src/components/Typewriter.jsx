import React, { useState, useEffect, useRef, memo } from "react";
import { formatBoldText } from "../utils/formatBoldText";
import { SkipForward } from "react-feather";

const cursor = '<span className="cursor">&#9608;</span>';

const Typewriter = ({ text, setShowActions }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 30;
  const stop = index === text.length;
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayedText((prevDisplayedText) => {
        const newDisplayedText =
          text.substring(0, index) + (showCursor ? cursor : "");
        setShowCursor((prevShowCursor) => !prevShowCursor);
        return newDisplayedText;
      });
      setIndex((prevIndex) =>
        prevIndex < text.length ? prevIndex + 1 : prevIndex
      );
    }, typingSpeed);
    if (stop) {
      setShowCursor(false);
      setShowActions(true);
    }

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, stop, index, showCursor, typingSpeed]);
  const handleSkip = () => {
    console.log(text);
    setIndex(text.length);
  };
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: formatBoldText(displayedText),
        }}
        className="my-2"
      />
      {!stop && (
        <SkipForward
          size={22}
          className="hover:text-primary cursor-pointer"
          onClick={handleSkip}
        />
      )}
    </>
  );
};

export default memo(Typewriter);
