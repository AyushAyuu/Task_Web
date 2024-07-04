import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditTask = () => {
  const params = useParams();
  const [initialData, setInitialData] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("06:00");
  const navigate = useNavigate();

  // edit task for the user id
  function getTask() {
    fetch("https://task-data-9a5y.onrender.com/myTasks/" + params.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setInitialData(data);
      })
      .catch((error) => {
        alert("unable to read the task details");
      });
  }

  useEffect(getTask, []);

  // input time handle
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  // edit data submit
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
      alert("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch(
        "https://task-data-9a5y.onrender.com/myTasks/" + params.id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createTask),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // task add success
        navigate("/");
      } else if (response.status === 400) {
        alert("validation error");
      } else {
        alert("unable to update the task");
      }
    } catch (error) {
      alert("unable to connect to a server");
    }
  }

  return (
    <div className="container my-4 py-5">
      <div className="row px-4">
        <div className="col-md-10 mx-auto mb-4 p-4">
          <h2 className="text-center text-danger mb-4">
            <b>Edit Task</b>
          </h2>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">TM-ID</label>
            <div className="col-sm-8">
              <input
                className="form-control-plaintext"
                readOnly
                defaultValue={params.id}
              />
            </div>
          </div>

          {initialData && (
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Your Task</label>
                <div className="col-sm-8">
                  <input
                    className="form-control border-dark rounded-0"
                    name="Task"
                    defaultValue={initialData.Task}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">
                  Scheduled Date
                </label>
                <div className="col-sm-8">
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    name="date"
                    defaultValue={initialData.date}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">
                  Scheduled Time
                </label>
                <div className="col-sm-8">
                  <input
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    name="time"
                    defaultValue={initialData.time}
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
                    defaultValue={initialData.Mark}
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
                    Edit Task
                  </button>
                </div>
                <div className="col-sm-4 d-grid mt-3">
                  <Link to="/" className="btn btn-secondary" role="button">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTask;
