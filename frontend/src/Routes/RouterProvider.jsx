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
import PredictiveText from "../components/Test/PredictiveText";
import Profile from "../components/Users/Profile";
import CandelsVolume from "../components/Test/CandelsVolume";
import TradingChartV2 from "../components/Charts/TradingChartV2";

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
            <Route path="/candels" element={<TradingChartV2 />} />
            <Route path="/pre" element={<PredictiveText />} />
            <Route path="/profile" element={<Profile />} />
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
