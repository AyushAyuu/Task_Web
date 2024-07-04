import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const navigate = useNavigate();

  // register form submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    let regObj = { id, name, email, password };

    fetch("https://task-data-9a5y.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regObj),
    })
      .then((res) => {
        toast.success("Registered successfully");
        navigate("/login");
      })
      .catch((err) => {
        toast.success("Failed :" + err.message);
      });
  };
  return (
    <>
      <section className="dd">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 p-4">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black border-0 dd1">
                <div className="card-body rounded-5 p-md-4 register">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center text-white h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill"
                          >
                            <label
                              className="form-label text-white"
                              htmlFor="form3Example1c"
                            >
                              User Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              placeholder="Enter User Name"
                              value={id}
                              onChange={(e) => idChange(e.target.value)}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill">
                            <label className="form-label text-white">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={name}
                              placeholder="Enter Full Name"
                              onChange={(e) => nameChange(e.target.value)}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill">
                            <label className="form-label text-white">
                              Your Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              placeholder="Enter Email Address"
                              onChange={(e) => emailChange(e.target.value)}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill">
                            <label className="form-label text-white">
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              value={password}
                              placeholder="Create Password"
                              onChange={(e) => passwordChange(e.target.value)}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-3">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            required
                          />
                          <label className="form-check-label text-white">
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-3">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                          <a
                            href="/login"
                            type="button"
                            className="btn btn-danger btn-lg mx-3"
                          >
                            Cancel
                          </a>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"></div>
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

export default Register;
