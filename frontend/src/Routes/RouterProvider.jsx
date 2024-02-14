import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import LoginRoute from "./LoginRoute";
import Main from "../components/Layouts/Main/Main";
import Login from "../Pages/Login";
import ScrollToTop from "../components/Ui/ScrollToTop";
import Messages from "../components/Test/Messages";
import ChatBox from "../components/Chat/ChatBox";
import Trading from "../components/Charts/Trading";

export default function RouterProvider() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<ChatBox />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/trading" element={<Trading />} />
          </Route>
          <Route element={<LoginRoute />}>
            <Route element={<Login />} path="/login" />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}
