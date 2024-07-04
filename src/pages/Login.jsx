import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // for login purpose without login not go to home page
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  // for login form
  const handledLogin = (e) => {
    e.preventDefault();
    console.log("login");
    if (validate()) {
      // fetch api
      // fetch(`http://localhost:4000/users/${userName}`)
      fetch(`https://task-data-9a5y.onrender.com/users/${userName}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.password === password) {
            toast.success("Login successfully", { autoClose: 2000 });
            sessionStorage.setItem("userName", userName);
            navigate("/");
          } else {
            toast.error("Invalid username or password", { autoClose: 2000 });
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  // for validation
  const validate = () => {
    let result = true;
    //  check the username and password from data
    if (userName === "") {
      result = false;
      toast.warning("Please enter the UserName", { autoClose: 2000 });
    }
    if (password === "") {
      result = false;
      toast.warning("Please enter the Password", { autoClose: 2000 });
    }
    return result;
  };
  return (
    <>
      <section className="dd">
        <div className="container h-100 p-4">
          <div className="row d-flex justify-content-center align-items-center p-5">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black dd1 border-0">
                <div className="card-body rounded-5 p-md-4 login">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-7  order-2 order-lg-1"></div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2">
                      <form
                        onSubmit={handledLogin}
                        className="mx-1 mx-md-4 offset-5"
                      >
                        <p className="text-center  h1 fw-bold mb-4 mx-1 mx-md-4 ">
                          Login
                        </p>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill">
                            <label className="form-label  ">User Name</label>
                            <input
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              className="form-control"
                              placeholder="Enter the User Name"
                              autoComplete="off"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                              placeholder="Enter the Password"
                              autoComplete="off"
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-3">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                          />
                          <label className="form-check-label  ">
                            Remember me
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-3">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-3">
                          Don't have an account?
                          <a href="/register"> Register</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
