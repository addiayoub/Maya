import React, { useState, useEffect } from "react";
import { formatBoldText } from "../utils/formatBoldText";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const typingSpeed = 30 + text.length * 2;
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayedText(text.substring(0, index));
      setIndex((prevIndex) =>
        prevIndex < text.length ? prevIndex + 1 : prevIndex
      );
    }, 30);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, index]);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: formatBoldText(displayedText),
      }}
      className="my-2"
    />
  );
};

export default Typewriter;
