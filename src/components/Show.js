import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Show = () => {
  const [tasks, setTasks] = useState([]);

  const tasksColections = collection(db, "tasks");

  const getTasks = async () => {
    const querySnapshot = await getDocs(tasksColections);
    const taskIds = querySnapshot.docs.map((doc) => doc.id);
    console.log(taskIds);
  };

  useEffect(() => {
    console.log(process.env);
    getTasks();
  }, []);
  return (
    <div>
      <h1>Show</h1>
    </div>
  );
};

export default Show;
