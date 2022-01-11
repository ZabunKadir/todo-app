import Home from "../pages/home/home";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import NotFound from "../components/notFound";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
