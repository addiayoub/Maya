import React, { useState, useEffect } from "react";

const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayedText(text.substring(0, index));
      setIndex((prevIndex) =>
        prevIndex < text.length ? prevIndex + 1 : prevIndex
      );
    }, 70);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, index]);

  return displayedText;
};

export default Typewriter;
