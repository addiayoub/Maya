import React, { useState, useEffect } from "react";
import { Box, ChevronDown, ChevronUp, Copy } from "react-feather";
import DefaultMessages from "./DefaultMessages";
import { MESSAGES } from "../../data/meassages";
import { IconButton, Tooltip, TextField } from "@mui/material";
import logo from "../../assets/images/mini-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getPrompts } from "../../redux/actions/PromptActions";
import { isInLocalStorage } from "../../utils/isInLoacalStorage";

const defaultMessages1 = [
  { _id: 1, title: "Bonjour" },
  { _id: 2, title: "quelles sont les fonctionnalités que tu proposes" },
  {
    _id: 3,
    title:
      "Quels types d'informations et de résumés MAYA offre-t-elle pour suivre l'évolution des marchés, et sur quels marchés spécifiques se concentre-t-elle?",
  },
  {
    _id: 4,
    title:
      "Graphique présentant l'historique vl base 100 de RMA EQUITY  sur 2023",
  },
  {
    _id: 5,
    title:
      "Pouvez-vous me fournir des indicateurs chartistes pour l'action de Cosumar en date du 02 Fév 2024?",
  },
  {
    _id: 6,
    title:
      "Quelles actions enregistrent actuellement les volumes de transaction les plus importants?",
  },
];

const ChatBoxHeader = () => {
  const [isShow, setIsShow] = useState(true);
  const { prompts, loading } = useSelector((state) => state.prompt);
  const defaultMessages = prompts.filter((prompt) => prompt.isDefault);
  console.log("defaultMessages are", defaultMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomItems, setRandomItems] = useState(defaultMessages);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase().trim();
    setSearchTerm(term);
    if (term) {
      const filteredMessages = prompts.filter((message) =>
        message.title.toLowerCase().includes(term)
      );
      setRandomItems(filteredMessages);
      return;
    }
    setRandomItems(defaultMessages);
  };
  const reset = () => {
    setSearchTerm("");
    setRandomItems(defaultMessages);
  };
  const handleShuffle = () => {
    const copyPrompts = [...prompts];
    const shuffledMessages = copyPrompts.sort(() => 0.5 - Math.random());
    console.log("selected items", shuffledMessages);
    const selectedItems = shuffledMessages.slice(0, 6);
    setRandomItems(selectedItems);
  };

  // get prompts
  useEffect(() => {
    if (!isInLocalStorage("prompts")) {
      dispatch(getPrompts())
        .unwrap()
        .then((prompts) => {
          // setRandomItems(prompts);
          console.log("get prompts res", prompts);
        });
    }
  }, []);

  useEffect(() => {
    setRandomItems(defaultMessages);
  }, [prompts]);

  return (
    <div className="sticky left-0 top-0 z-10 bg-white p-0 shadow-bottom w-full">
      <div className="mb-1.5 flex items-center justify-between h-14 p-2 font-semibold dark:bg-gray-800">
        <div className="absolute left-1/2 -translate-x-1/2"></div>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2 select-none">
            <div
              className="group flex items-center gap-1 rounded-xl py-2 px-2 text-lg font-medium bg-sky-50 radix-state-open:bg-gray-50 dark:bg-black/10 dark:radix-state-open:bg-black/20"
              type="button"
              id="radix-:rqr:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <img src={logo} className="w-[30px] h-[30px]" />
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
      {loading && <h3>Loading...</h3>}
      {!loading && isShow && (
        <DefaultMessages messages={randomItems} reset={reset} />
      )}
    </div>
  );
};

export default ChatBoxHeader;
