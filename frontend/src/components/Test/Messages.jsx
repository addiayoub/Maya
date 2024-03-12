import React, { memo, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = () => {
  const [messages, setMessages] = React.useState(["1"]);
  useEffect(() => {
    console.log("hi");
    const intervalId = setInterval(() => {
      // Add a new message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        `New Message ${prevMessages.length + 1}`,
      ]);
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <ScrollToBottom className="message-container" checkInterval={1}>
      {messages.map((message, index) => (
        <div key={index} className="message">
          {message}
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default memo(Messages);
