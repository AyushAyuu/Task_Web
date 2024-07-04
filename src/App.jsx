import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import TaskList from "./pages/admin/taskdetails/TaskList";
import CreateTask from "./pages/admin/taskdetails/CreateTask";
import EditTask from "./pages/admin/taskdetails/EditTask";
function App() {
  return (
    <>
      <ToastContainer theme="colored"></ToastContainer>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route
            path="/admin/task/tasklist"
            element={
              <>
                <Navbar />
                <TaskList />
                <Footer />
              </>
            }
          /> */}
          <Route
            path="/admin/task/create"
            element={
              <>
                <Navbar />
                <CreateTask />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin/task/edit/:id"
            element={
              <>
                <Navbar />
                <EditTask />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
