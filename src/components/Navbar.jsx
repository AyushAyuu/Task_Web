import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  // for passing username in navbar
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      navigate("/login");
    }
  }, [sessionStorage.getItem("userName")]);

  return (
    <nav className="navbar navbar-expand-lg box-shadow bg-dark p-0 pt-2 position-fixed top-0 w-100">
      <div className="container d-flex">
        <div>
          <Link className="navbar-brand d-flex p-0" to="/">
            <img
              src="./src/assets/logo.png"
              alt=""
              width={60}
              height={55}
              className="me-2 mb-2"
            />
            <h5 className="text-white text-bold my-auto">
              <b>Task Manager</b>
            </h5>
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to="/">
                Task List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/task/create">
                Create Task
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="dropdown my-2 ">
            <a
              className="dropdown-toggle text-warning text-weight-bold text-capitalize text-decoration-none"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Welcome {userName}
            </a>
            <ul className="dropdown-menu p-0 border-0 mx-4 mt-3">
              <Link className=" btn btn-danger w-100" to="/login">
                Logout
              </Link>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
