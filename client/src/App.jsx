import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import SuccessLogin from "./components/SuccessLogin";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success-login" element={<SuccessLogin />} />
      </Routes>
    </Router>
  );
}
export default App;
