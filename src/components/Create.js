import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Create = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [done, setDone] = useState("");
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("High");

  const taskCollection = collection(db, "tasks");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(taskCollection, {
      description: description,
      done: done,
      name: name,
      priority: priority,
    });
    navigate("/");
  };
  return (
    <div className="createPage">
      <form className="createForm" onSubmit={store}>
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
        <button className="createTaskBtn" onClick={() => navigate(`/create`)}>
          Create New Task
        </button>
      </form>
    </div>
  );
};

export default Create;
