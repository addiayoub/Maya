import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInput } from "../../redux/slices/ChatSlice";
import useHandleGenerate from "../../Hooks/useHandleGenerate";
import { Clipboard, Trash } from "react-feather";
import "./DefaultMessages.css";
import { handleCopy } from "../../utils/handleCopy";
import { Tooltip } from "@mui/material";
import { deletePrompt as deletePromptAction } from "../../redux/actions/PromptActions";
import { deletePrompt } from "../../redux/slices/PromptSlice";
import { notyf } from "../../utils/notyf";
import ModalComponent from "../Ui/ModalComponent";
import DeleteModal from "../Ui/DeleteModal";

const msgs = [
  "quelles sont les fonctionnalités que tu propose?",
  "graphique qui présente l'évolution historique des performances ytd de ATTAKAFOUL, CIH ACTIONS",
  "Graphique présentant l'historique vl base 100 de RMA EQUITY  sur 2023",
  "Pouvez-vous me fournir des indicateurs chartistes pour l'action de Cosumar en date du 02 Fév 2024?",
  "Qu’en est-il des indicateurs statistiques?",
  "Quelles actions enregistrent actuellement les volumes de transaction les plus importants?",
];

const DefaultMessages = ({ messages, reset }) => {
  console.log("default messages", messages);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
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
  const handleDeletePrompt = (id) => {
    console.log("handleDelete prompt", id);
    dispatch(deletePromptAction({ id }))
      .unwrap()
      .then(({ message }) => {
        notyf.success(message);
        dispatch(deletePrompt({ id }));
        reset();
      })
      .catch((error) => {
        notyf.error(error);
      });
  };
  const deleteModal = (confirm) => {
    if (confirm) {
      handleDeletePrompt(id);
    }
    setOpen(false);
  };
  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12
        xl:grid-cols-12 gap-y-4 gap-x-4 items-stretch overflow-y-auto max-h-[300px]"
      >
        {messages.map((msg) => {
          return (
            <div
              key={msg._id}
              onClick={() => handleClick(msg.title)}
              className="message cursor-pointer transition ease-in-out hover:shadow-lg rounded-md md:col-span-4 lg:col-span-4 xl:col-span-4 p-3 text-gray-800 font-normal select-none border-[1px] border-solid border-slate-400"
            >
              {msg.title}

              <div className="actions">
                <Tooltip title="Copier" arrow>
                  <Clipboard
                    size={20}
                    className="copy-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(msg.title);
                      dispatch(setUserInput(msg.title));
                    }}
                  />
                </Tooltip>
                <Tooltip title="Supprimer" arrow>
                  <Trash
                    className="hover:text-error"
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation();
                      setId(msg._id);
                      setOpen(true);
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
      {open && (
        <ModalComponent open={open} handleClose={() => setOpen(false)}>
          <DeleteModal handleDeleteConfirmation={deleteModal} />
        </ModalComponent>
      )}
    </>
  );
};

export default memo(DefaultMessages);
