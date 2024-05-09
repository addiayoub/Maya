import React, { memo, useEffect, useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Edit, LogOut, Trash } from "react-feather";
import {
  deleteChatHistory,
  newChat,
  clearChatsHistory,
  resetLoading,
  setChats,
  setChatsHistory,
  setCurrentChat,
  editChatHistory,
  resetLastMsgId,
  resetChatSlice,
} from "../../../redux/slices/ChatSlice";
import {
  deleteChat,
  editChat,
  getChat,
  getChats,
} from "../../../redux/actions/ChatActions";
import { toggleSidebar } from "../../../redux/slices/LayoutSlice";
import { notyf } from "../../../utils/notyf";
import Dropdown from "../../Test/DropDown";
import ModalComponent from "../../Ui/ModalComponent";
import DeleteModal from "../../Ui/DeleteModal";
import SidebarLoader from "../../Loaders/SidebarLoader";
import DropDownMenu from "./DropDownMenu";

const Sidebar = () => {
  const { isOpen } = useSelector((state) => state.layout);
  const { chatsHistory, chats, currentChat } = useSelector(
    (state) => state.chat
  );
  const [searchTerm, setSearchTerm] = useState("");
  const filteredChatsHistory = chatsHistory.filter((chat) => {
    return (
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some((message) =>
        message.data.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const shouldHideSidebar = windowWidth < 992;
  useEffect(() => {
    if (shouldHideSidebar) {
      dispatch(toggleSidebar(false));
    } else {
      dispatch(toggleSidebar(true));
    }
  }, [shouldHideSidebar]);

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
            localStorage.setItem("currentChats", JSON.stringify([]));
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
    console.log("GetLocal Chats", JSON.parse(localStorage.getItem("chats")));
    if (!editingChatId && currentChat !== id) {
      dispatch(newChat());
      dispatch(setCurrentChat(id));
      localStorage.setItem("currentChatId", id);
      dispatch(getChat({ id }))
        .unwrap()
        .then(({ chat: { messages } }) => {
          console.log("getChat success", messages);
          dispatch(setChats(messages));
          localStorage.setItem("currentChats", JSON.stringify(messages));
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
            <span className="text-sm">Nouveau Chat</span>
            <Tooltip title="Nouveau Chat" arrow>
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
              return (
                <li
                  onClick={() => handleGetChat(id)}
                  className={`side-menu-item text-sm flex items-center justify-between hover:bg-gray-100 ${
                    currentChat === id ? "bg-gray-100" : ""
                  }`}
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
      {openModal && (
        <ModalComponent
          open={openModal}
          handleClose={() => setOpenModal(false)}
        >
          <DeleteModal
            handleDeleteConfirmation={handleDeleteConfirmation}
            // handleDelete={handleDeleteChat}
          />
        </ModalComponent>
      )}
    </>
  );
};

export default memo(Sidebar);
