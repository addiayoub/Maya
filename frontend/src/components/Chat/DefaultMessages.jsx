import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInput } from "../../redux/slices/ChatSlice";
import useHandleGenerate from "../../Hooks/useHandleGenerate";
import { Clipboard } from "react-feather";
import "./DefaultMessages.css";
import { notyf } from "../../utils/notyf";
import { Tooltip } from "@mui/material";

const msgs = [
  "quelles sont les fonctionnalités que tu propose?",
  "graphique qui présente l'évolution historique des performances ytd de ATTAKAFOUL, CIH ACTIONS",
  "Graphique présentant l'historique vl base 100 de RMA EQUITY  sur 2023",
  "Pouvez-vous me fournir des indicateurs chartistes pour l'action de Cosumar en date du 02 Fév 2024?",
  "Qu’en est-il des indicateurs statistiques?",
  "Quelles actions enregistrent actuellement les volumes de transaction les plus importants?",
];

const DefaultMessages = ({ messages }) => {
  const dispatch = useDispatch();
  const { handleGenerate } = useHandleGenerate();
  const handleClick = async (message) => {
    try {
      await handleGenerate(message);
      // dispatch(setChat(successValue));
      // console.log("successValue", successValue);
      // Handle success
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  const handleCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      dispatch(setUserInput(text));
      notyf.success("Copied !");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12
        xl:grid-cols-12 gap-y-4 gap-x-4 items-stretch overflow-y-auto"
    >
      {messages.map((msg, index) => {
        return (
          <div
            key={index}
            style={{ border: "1px solid #94a3b8" }}
            // onMouseOver={() => setShowOptions(true)}
            onClick={() => handleClick(msg)}
            className="message cursor-pointer transition ease-in-out hover:shadow-lg rounded-md md:col-span-4 lg:col-span-4 xl:col-span-4 p-3 text-gray-800 font-normal select-none"
          >
            {msg}

            <Tooltip title="Copier" arrow>
              <Clipboard
                size={20}
                className="copy-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(msg);
                }}
              />
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export default DefaultMessages;
