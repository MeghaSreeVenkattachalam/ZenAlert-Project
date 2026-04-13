import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./Components/SignUp";
import { Login } from "./Components/Login";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Emergency from "./Components/Emergency";
import MentalWellBeing from "./Components/MentalWellBeing";
import Chatbot from "./Components/Chatbot";
import Videorecommend from "./Components/Videorecommend";
import News from "./Components/News";
import TaskManager from "./Components/TaskManager";
import MoodTracker from "./Components/MoodTracker";
import ProtectedRoute from "./Components/ProtectedRoute";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

function App() {
  return (
    <div className="home_section">
      <Router>
        <NavBar />
        <Chatbot />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Protected Routes */}
          <Route
            path="/mental-wellbeing"
            element={
              <ProtectedRoute>
                <MentalWellBeing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <ProtectedRoute>
                <Emergency />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videorecommend"
            element={
              <ProtectedRoute>
                <Videorecommend />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/taskmanager"
            element={
              <ProtectedRoute>
                <TaskManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/moodtracker"
            element={
              <ProtectedRoute>
                <MoodTracker />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
