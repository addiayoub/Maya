import { notyf } from "../../utils/notyf";
import { logout } from "../slices/AuthSlice";
import { resetChatSlice } from "../slices/ChatSlice";

const authMiddleware = (store) => (next) => (action) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const { expiresAt } = user;
    const currentTime = Date.now() / 1000;
    if (expiresAt < currentTime && action.type !== "auth/logout") {
      console.log("Logged u out");
      store.dispatch(logout());
      store.dispatch(resetChatSlice());
      notyf.error(
        `Votre session a expiré. Veuillez vous reconnecter pour continuer.`
      );
      return;
    }
  }

  return next(action);
};

export default authMiddleware;
