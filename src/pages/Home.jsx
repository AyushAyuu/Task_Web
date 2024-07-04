import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [task, setTask] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // for storing user name data
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
      // getTask();
    } else {
      navigate("/login");
    }
  }, [sessionStorage.getItem("userName")]);
  // }, []);

  useEffect(() => {
    if (userName) {
      getTask();
    }
  }, [userName]);

  // fetching the task for specific user
  function getTask() {
    // fetch(`http://localhost:4000/myTasks?createdBy=${userName}`)
    fetch(`https://task-data-9a5y.onrender.com/myTasks?createdBy=${userName}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setTask(data);
        localStorage.setItem("tasks", JSON.stringify(data));
      })
      .catch((error) => {
        alert("Unable to get the data");
      });
  }

  // clear session storage
  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    } else {
      getTask();
    }
  }, []);

  useEffect(getTask, []);

  // delete task

  function deleteTask(id) {
    fetch("https://task-data-9a5y.onrender.com/myTasks/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        alert("Have you complete this task");
        getTask();
        setTask(task.filter((task) => task.id !== id));
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        const updatedTasks = storedTasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      })
      .catch((error) => {
        alert("error");
      });
  }

  return (
    <>
      <div className="container my-4 py-5">
        <div className="d-flex mb-3">
          <div className="create-btn">
            <Link
              to="/admin/task/create"
              className="btn btn-primary me-1"
              role="button"
            >
              Create Task
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={getTask}
            >
              Refresh
            </button>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr className="text-center">
              <th>TM-ID</th>
              <th>Task</th>
              <th>Date</th>
              <th>Time</th>
              <th>Mark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((tasks, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>{tasks.id}</td>
                  <td className="text-capitalize">{tasks.Task}</td>
                  <td>{tasks.date}</td>
                  <td>{tasks.time}</td>
                  <td>{tasks.Mark}</td>
                  <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                    <Link
                      to={"/admin/task/edit/" + tasks.id}
                      className="btn btn-warning btn-sm me-1 "
                    >
                      <MdCreate />
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTask(tasks.id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
