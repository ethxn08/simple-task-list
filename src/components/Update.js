import { getDoc, updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Update = () => {
  const [description, setDescription] = useState("");
  const [done, setDone] = useState("");
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const updateTask = async (e) => {
    e.preventDefault();
    const task = doc(db, "tasks", id);
    await Swal.fire({
      title: "Update the task ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDoc(task, {
          description: description,
          done: done,
          name: name,
          priority: priority,
        });
        navigate("/");
      }
    });
  };

  const getProductById = async (id) => {
    const task = await getDoc(doc(db, "tasks", id));
    if (task.exists()) {
      setDescription(task.data().description);
      setDone(task.data().done);
      setName(task.data().name);
      setPriority(task.data().priority);
      console.log(task.data());
    } else {
      Swal.fire({
        title: "The resource you are looking for does not exist",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Redirect Me",
        showCancelButton: false,
        showCloseButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

  useEffect(() => {
    getProductById(id);
  }, []);

  return (
    <div className="createPage">
      <form className="createForm">
        <div className="inputContainer">
          <label title="Name">Name</label>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label title="Description">Description</label>
          <input
            type="text"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label title="Priority">Priority</label>
          <select
            name="Priority"
            required
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High" className="option">
              High
            </option>
            <option value="Medium" className="option">
              Medium
            </option>
            <option value="Low" className="option">
              Low
            </option>
          </select>
        </div>

        {/*AÑADIR MODAL CON SWAL PARA CONFIRMAR LA ACTUALIZACIÓN */}
        <div className="buttonContainer">
          <button className="createTaskBtn" onClick={(e) => updateTask(e)}>
            Update
          </button>
          <button className="goBackBtn" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
