import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Edit, LogOut, Trash } from "react-feather";
import {
  deleteChatHistory,
  newChat,
  clearChatsHistory,
  resetLoading,
  setChat,
  setChats,
  setChatsHistory,
  setChatsHistory2,
  setCurrentChat,
  editChatHistory,
  resetLastMsgId,
} from "../../../redux/slices/ChatSlice";
import {
  createChat,
  deleteChat,
  editChat,
  getChat,
  getChats,
} from "../../../redux/actions/ChatActions";
import { notyf } from "../../../utils/notyf";
import Dropdown from "../../Test/DropDown";
import ModalComponent from "../../Ui/ModalComponent";
import DeleteModal from "../../Ui/DeleteModal";
import SidebarLoader from "../../Loaders/SidebarLoader";

const DropDownMenu = ({ id, title, handleEditClick, handleDeleteChat }) => {
  return (
    <div className="py-3.5 px-2.5 flex flex-col gap-4 text-sm ">
      <div
        className="flex flex-wrap gap-3 hover:bg-gray-100 rounded-md p-2.5"
        onClick={(e) => {
          e.stopPropagation();
          console.log("div clicked");
          handleEditClick(id, title);
        }}
      >
        <Edit
          color="var(--primary-color)"
          size={16}
          onClick={(e) => {
            e.stopPropagation();
            console.log("div clicked");
            // handleEditClick(id, title);
          }}
        />
        <span>Renommer</span>
      </div>

      <div
        className="flex flex-wrap gap-3 hover:bg-gray-100 rounded-md p-2.5"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteChat(id);
        }}
      >
        <Trash color="var(--error-color)" size={16} />
        <span className="text-error">Supprimer</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.layout);
  const storedChats = JSON.parse(localStorage.getItem("chats")) ?? [];
  const { chatsHistory, chats, currentChat } = useSelector(
    (state) => state.chat
  );
  const [searchTerm, setSearchTerm] = useState("");
  const filteredChatsHistory = chatsHistory.filter((chat) =>
    chat.messages.some((message) =>
      message.data.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  console.log("Chats", chats);

  const displayChatsHistory = searchTerm ? filteredChatsHistory : chatsHistory;
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [deleteChatId, setDeleteChatId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const handleEditClick = (id, newTitle) => {
    setNewTitle(newTitle);
    setEditingChatId(id);
  };
  console.log("chatsHistory", chatsHistory);
  console.log("Chats from storage", JSON.parse(localStorage.getItem("chats")));
  const handleSaveEdit = (id, oldTitle) => {
    // Implement logic to save the edited title, e.g., through an API call
    // Once saved, reset editing state
    console.log(`edit ${id} : ${newTitle}`);
    console.log(newTitle.trim() !== "");
    if (oldTitle !== newTitle.trim() && newTitle.trim() !== "") {
      dispatch(editChatHistory({ id, newTitle }));
      dispatch(editChat({ id, newTitle }))
        .unwrap()
        .then(({ chats }) => {
          // dispatch(setChatsHistory2(chats));
          console.log("chats Updted");
        })
        .catch();
    }
    setEditingChatId(null);
  };
  const dispatch = useDispatch();
  const handleNewChat = () => {
    console.log("Chats is", chats);
    // dispatch(createChat({ title: "New chat" }));
    dispatch(resetLoading());
    dispatch(newChat());
  };
  useEffect(() => {
    setIsLoading(true);
    dispatch(clearChatsHistory());
    dispatch(getChats())
      .unwrap()
      .then(({ chats }) => {
        dispatch(clearChatsHistory());
        console.log("get chats", chats);
        const history = chats.map(({ title, _id }) => ({ _id, title }));
        console.log("hist", ...history);
        dispatch(setChatsHistory(chats));
      })
      .catch()
      .finally(() => setIsLoading(false));
  }, []);
  const handleDeleteChat = (id) => {
    setDeleteChatId(id);
    setOpenModal(true);
    console.log(deleteChatId, "id to delete");
  };
  const handleDeleteConfirmation = (confirmation) => {
    console.log("confirmation", confirmation);
    if (confirmation) {
      dispatch(deleteChatHistory(deleteChatId));
      dispatch(deleteChat({ id: deleteChatId }))
        .unwrap()
        .then(({ message, chats }) => {
          notyf.success(message);
          localStorage.setItem("chats", JSON.stringify(chats));
          if (currentChat === deleteChatId) {
            console.log("Chats after delete", chats);
            dispatch(newChat());
          }
        })
        .catch()
        .finally(() => setOpenModal(false));
    } else {
      setOpenModal(false);
    }
  };
  const handleGetChat = (id) => {
    console.log("Current", currentChat);
    dispatch(resetLastMsgId());
    if (!editingChatId && currentChat !== id) {
      dispatch(newChat());
      dispatch(setCurrentChat(id));
      dispatch(getChat({ id }))
        .unwrap()
        .then(({ chat: { messages } }) => {
          console.log("getChat success", messages);
          dispatch(setChats(messages));
        })
        .catch();
    }
  };
  useEffect(() => {
    console.log("deleted chat", deleteChatId);
  }, [deleteChatId]);
  return (
    <>
      <aside className={`side-menu ${!isOpen ? "hide" : ""}`} id="sidebar">
        <div className="sidebar-header">
          {/* <img src={Logo} alt="ida-tech-logo" className="logo" /> */}
          <button
            onClick={handleNewChat}
            className="flex justify-between items-center w-full p-2 bg-gray-100 rounded-xl hover:shadow-lg transition-all ease-in duration-300"
          >
            <span className="text-sm">New Chat</span>
            <Tooltip title="New Chat" arrow>
              <Edit size={14} />
            </Tooltip>
          </button>
          <TextField
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            className="w-full my-3"
          />
        </div>
        <div className="sidebar-body p-2 overflow-y-auto">
          <ul className="side-menu ">
            {isLoading && <SidebarLoader />}
            {displayChatsHistory.map(({ title, _id: id }) => {
              console.log(`${title} : ${id}`);
              return (
                <li
                  onClick={() => handleGetChat(id)}
                  className="side-menu-item hover:bg-gray-100 text-sm flex items-center justify-between "
                  key={id}
                >
                  {editingChatId === id ? (
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onBlur={() => handleSaveEdit(id, title)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSaveEdit(id, title)
                      }
                      autoFocus
                    />
                  ) : (
                    <>
                      {title}
                      <Dropdown>
                        <DropDownMenu
                          {...{
                            id,
                            title,
                            handleDeleteChat,
                            handleEditClick,
                          }}
                        />
                      </Dropdown>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div className="sidebar-footer">
          <div className="profile-icons p-2">
            <span className="user font-medium" id="user">
              {user.username}
            </span>
            <IconButton
              onClick={() => dispatch(logout())}
              className="bg-gray-50"
            >
              <Tooltip title="Se déconnecter" arrow>
                <LogOut size={16} />
              </Tooltip>
            </IconButton>
          </div>
        </div> */}
      </aside>
      <ModalComponent open={openModal} handleClose={() => setOpenModal(false)}>
        <DeleteModal
          handleDeleteConfirmation={handleDeleteConfirmation}
          // handleDelete={handleDeleteChat}
        />
      </ModalComponent>
    </>
  );
};

export default Sidebar;
