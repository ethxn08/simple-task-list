import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Show = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const tasksColections = collection(db, "tasks");

  const getTasks = async () => {
    const data = await getDocs(tasksColections);

    setTasks(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    getTasks();
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Remove the task ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  useEffect(() => {
    console.log(process.env);
    getTasks();
  }, []);

  console.log("Tasks -->", tasks);

  const returnPriority = (priority) => {
    if (priority === "High") {
      return <span className="priorityHigh">{priority}</span>;
    }
    if (priority === "Medium") {
      return <span className="priorityMedium">{priority}</span>;
    }
    if (priority === "Low") {
      return <span className="priorityLow">{priority}</span>;
    }
  };
  return (
    <div className="taskContainer">
      <div className="createTaskContainer">
        <button className="createTaskBtn" onClick={() => navigate(`/create`)}>
          Create New Task
        </button>
      </div>
      <div className="taskListContainer">
        {tasks.map((t) => {
          return (
            <>
              <div className="taskCard" key={t.id}>
                <div
                  className="infoSection"
                  onClick={() => navigate(`/update/${t.id}`)}
                >
                  <h1>{t.name}</h1>
                  <p>{t.description}</p>
                  {returnPriority(t.priority)}
                </div>
                <div
                  className="deleteSection"
                  onClick={() => confirmDelete(t.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Show;
