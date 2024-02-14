import { useDispatch, useSelector } from "react-redux";
import {
  setChat,
  setChatsHistory,
  setCurrentChat,
  setUserInput,
} from "../redux/slices/ChatSlice";
import { createChat, getData } from "../redux/actions/ChatActions";
import { notyf } from "../utils/notyf";

const useHandleGenerate = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
  const handleGenerate = async (message) => {
    try {
      console.log("msg", message);
      dispatch(setChat({ isUser: true, data: { content: message } }));
      dispatch(setUserInput(""));
      if (chats.length < 1) {
        const title = "Chat " + Math.floor(Math.random() * 100);
        await dispatch(createChat({ title }))
          .unwrap()
          .then(({ chatId }) => {
            console.log("call createChat");
            dispatch(setCurrentChat(chatId));
            dispatch(setChatsHistory([{ _id: chatId, title, messages: [] }]));

            console.log("success", chatId);
          })
          .catch((error) => {
            notyf.error("error create chat");
            console.log("error", error);
          });
      }
      // dispatch(setUserInput(message));
      dispatch(getData({ message }))
        .unwrap()
        .then((payload) => {
          console.log("call getData");
          dispatch(setChat(payload));
          console.log("successValue", payload);
        })
        .catch((error) => {
          notyf.error(error);
          console.log("handleGenerate", error);
        });
    } catch (error) {
      console.log("handleGenerate", error);
      throw error; // Re-throw the error for handling in the component
    }
  };

  return {
    handleGenerate,
  };
};

export default useHandleGenerate;
