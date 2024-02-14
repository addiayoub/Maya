import React, { useState } from "react";
import { Box, ChevronDown, ChevronUp, Copy } from "react-feather";
import DefaultMessages from "./DefaultMessages";
import { MESSAGES } from "../../data/meassages";
import { IconButton, Tooltip, TextField } from "@mui/material";
import logo from "../../assets/images/mini-logo.png";

const defaultMessages = [
  "Bonjour",
  "Quelles sont les fonctionnalités que tu propose?",
  "Quels types d'informations et de résumés MAYA offre-t-elle pour suivre l'évolution des marchés, et sur quels marchés spécifiques se concentre-t-elle?",
  "Graphique présentant l'historique vl base 100 de RMA EQUITY  sur 2023",
  "Pouvez-vous me fournir des indicateurs chartistes pour l'action de Cosumar en date du 02 Fév 2024?",
  "Quelles actions enregistrent actuellement les volumes de transaction les plus importants?",
];

const ChatBoxHeader = () => {
  const [isShow, setIsShow] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomItems, setRandomItems] = useState(defaultMessages);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase().trim();
    setSearchTerm(term);
    if (term) {
      const filteredMessages = MESSAGES.filter((message) =>
        message.toLowerCase().includes(term)
      );
      setRandomItems(filteredMessages);
      return;
    }
    setRandomItems(defaultMessages);
  };
  const handleShuffle = () => {
    const shuffledMessages = MESSAGES.sort(() => 0.5 - Math.random());
    const selectedItems = shuffledMessages.slice(0, 6);
    setRandomItems(selectedItems);
  };
  return (
    <div className="sticky left-0 top-0 z-10 bg-white p-2 shadow-bottom w-full">
      <div className="mb-1.5 flex items-center justify-between h-14 p-2 font-semibold dark:bg-gray-800">
        <div className="absolute left-1/2 -translate-x-1/2"></div>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2 select-none">
            <div
              className="group flex items-center gap-1 rounded-xl py-2 px-3 text-lg font-medium bg-gray-50 radix-state-open:bg-gray-50 dark:bg-black/10 dark:radix-state-open:bg-black/20"
              type="button"
              id="radix-:rqr:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <img src={logo} className="w-[37px] h-[37px]" />
              <div>MAYA GPT</div>
            </div>
            <Tooltip title={isShow ? "Collapse" : "Expand"} arrow>
              <IconButton
                onClick={() => setIsShow(!isShow)}
                className="bg-gray-50"
              >
                {!isShow ? <ChevronDown /> : <ChevronUp />}
              </IconButton>
            </Tooltip>
            {isShow && (
              <TextField
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearch}
                size="small"
              />
            )}
          </div>
          {isShow && (
            <Tooltip title="Random" arrow>
              <IconButton onClick={handleShuffle} className="bg-gray-50">
                <Box size={20} />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <div className="flex gap-2 pr-1"></div>
      </div>
      {isShow && <DefaultMessages messages={randomItems} />}
    </div>
  );
};

export default ChatBoxHeader;
