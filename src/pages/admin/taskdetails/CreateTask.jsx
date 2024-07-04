import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const CreateTask = () => {
  const [userName, setUserName] = useState("");
  const [task, setTask] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("06:00");
  const navigate = useNavigate();

  // stored user name
  useEffect(() => {
    let storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      navigate("/login");
    }
  }, [sessionStorage.getItem("userName")]);

  function getTask() {
    fetch(`https://task-data-9a5y.onrender.com/myTasks?createdBy=${userName}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setTask(data);
        sessionStorage.setItem("tasks", JSON.stringify(data));
      })
      .catch((error) => {
        alert("Unable to get the data");
      });
  }

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const createTask = Object.fromEntries(formData.entries());

    if (
      !createTask.Task ||
      !createTask.date ||
      !createTask.time ||
      !createTask.Mark
    ) {
      toast.error("Please Fill all the Details", { autoClose: 2000 });
      return;
    }
    try {
      const response = await fetch(
        "https://task-data-9a5y.onrender.com/myTasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createTask),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // task add success
        toast.success("Task Added Successfully", { autoClose: 2000 });
        getTask();
        navigate("/");
      } else if (response.status === 400) {
        toast.error("Validation Error", { autoClose: 2000 });
      } else {
        toast.error("unable to create the task", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("unable to connect to a server", { autoClose: 2000 });
    }
  }

  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    } else {
      getTask();
    }
  }, []);

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="container my-4 py-5">
      <div className="row px-4">
        <div className="col-md-10 mx-auto p-4">
          <h2 className="text-center text-danger mb-4">
            <b>Create Task</b>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">User Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control border-0 text-capitalize"
                  name="createdBy"
                  type="text"
                  value={userName}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">My Task</label>
              <div className="col-sm-8">
                <input
                  className="form-control border-dark rounded-0"
                  name="Task"
                  autoComplete="off"
                />
                <span className="text-danger"></span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Scheduled Date</label>
              <div className="col-sm-8">
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  name="date"
                />
                <span className="text-danger"></span>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">
                Task Completion Time
              </label>
              <div className="col-sm-8">
                <input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  name="time"
                />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Mark</label>
              <div className="col-sm-8">
                <select
                  name="Mark"
                  id=""
                  className="form-select border-dark rounded-0"
                >
                  <option value="Not Complete">Not Complete</option>
                  <option value="Complete">Complete</option>
                </select>
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid mt-3">
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
              <div className="col-sm-4 d-grid mt-3">
                <Link to="/" className="btn btn-secondary" role="button">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
