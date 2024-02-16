import React, { useState, useRef } from "react";

const defaultSuggestions = [
  "Hello",
  "How are you?",
  "What's up?",
  "Good morning",
  "Good afternoon",
  "Good evening",
  "Nice to meet you",
  "Thank you",
  "Please",
  "Excuse me",
];

const PredictiveText = () => {
  const [userText, setUserText] = useState("");
  const [aiText, setAIText] = useState("");
  const [loading, setLoading] = useState(false);

  const debounceTimeoutRef = useRef(null);
  const contentEditableRef = useRef(null);

  let enterPressed = false;

  const fetchSuggestions = (text) => {
    // if (text.trim().length) {
    //   setLoading(true);

    //   // Filter suggestions from the default array
    //   const filteredSuggestions = defaultSuggestions.filter((suggestion) =>
    //     suggestion.toLowerCase().startsWith(text.toLowerCase())
    //   );

    //   setAIText(filteredSuggestions[0] || "");
    //   setLoading(false);
    // }
    if (text.trim().length) {
      setLoading(true);

      // Split the text into words
      const words = text.trim().split(/\s+/);
      const lastWord = words[words.length - 1];
      console.log("Text", text, lastWord, words);
      // Filter suggestions based on the remaining characters of the last word
      const filteredSuggestions = defaultSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(lastWord.toLowerCase().slice(1))
      );

      setAIText(filteredSuggestions[0] || "");
      setLoading(false);
    }
  };

  const isCursorAtEnd = () => {
    const selection = window.getSelection();
    return selection.anchorOffset === selection.anchorNode.length;
  };

  const handleInput = (e) => {
    let newText = e.target.innerText;
    if (enterPressed && newText.endsWith("\n\n")) {
      // Remove the last newline character
      newText = newText.slice(0, -1);

      // Reset the flag
      enterPressed = false;
    }

    setUserText(newText);
    setAIText("");

    // Check if cursor is at the end
    if (isCursorAtEnd()) {
      // Debounce the API call
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        fetchSuggestions(newText);
      }, 0);
    }
  };

  const focusContentEditable = () => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  };

  const setCursorToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // false means collapse to end rather than the start
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const acceptSuggestion = () => {
    // const contentEditableElement = contentEditableRef.current;
    // if (aiText) {
    //   setUserText(userText + aiText);
    //   contentEditableElement.innerText = userText + aiText;
    //   setAIText("");
    //   setCursorToEnd(contentEditableElement);
    // }
    const contentEditableElement = contentEditableRef.current;
    if (aiText) {
      const cursorPosition = window.getSelection().getRangeAt(0).startOffset;
      const newText =
        userText.slice(0, cursorPosition - aiText.length) + aiText;

      setUserText(newText);
      contentEditableElement.innerText = newText;

      setAIText("");
      setCursorToEnd(contentEditableElement);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      acceptSuggestion();
    }

    if (event.key === "Enter") {
      // Set the flag to true when Enter is pressed
      enterPressed = true;

      // Allow the default Enter key behavior to occur
      setTimeout(() => {
        const contentEditableElement = contentEditableRef.current;
        const childNodes = Array.from(contentEditableElement.childNodes);

        // Find the last <br> element
        for (let i = childNodes.length - 1; i >= 0; i--) {
          if (childNodes[i].nodeName === "BR") {
            // Remove the last <br> element
            contentEditableElement.removeChild(childNodes[i]);
            break; // Exit the loop after removing the <br>
          }
        }

        // Insert an empty text node with a zero-width space
        const emptyTextNode = document.createTextNode("\u200B");
        contentEditableElement.appendChild(emptyTextNode);

        // Set cursor after the empty text node
        setCursorToEnd(contentEditableElement);
      }, 0); // SetTimeout with delay of 0 to allow the stack to clear and the <br> to be inserted
    }
  };

  return (
    <div className="flex flex-col place-items-center place-content-center h-screen">
      <label>Predictive Text Input</label>
      <div
        onClick={focusContentEditable}
        className="p-4 border shadow cursor-text rounded-lg text-left w-[600px] h-[200px] mx-auto overflow-auto"
      >
        <span
          ref={contentEditableRef}
          className="border-0 text-xs outline-none"
          contentEditable={true}
          suppressContentEditableWarning="true"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        >
          {/* {userText} */}
        </span>

        <span
          className={`text-xs text-gray-600 transition-opacity duration-500 ${
            aiText ? "opacity-100" : "opacity-0"
          }`}
          contentEditable={false}
        >
          {aiText.length > 0 && (
            <>
              {aiText}
              <span
                onClick={() => {
                  acceptSuggestion();
                }}
                className="border p-1.5 py-0.5 text-[10px] ml-1 inline-block w-fit rounded-md border-gray-300 cursor-pointer"
              >
                Tab
              </span>
            </>
          )}
        </span>
      </div>
      <div className="text-xs h-10 text-gray-700 italic">
        {loading && <div>loading ai suggestions...</div>}
      </div>
    </div>
  );
};

export default PredictiveText;
