import React from "react";
import clsx from "clsx";
import "./Task.css";
import { useStore } from "../store";
import deleteIcon from "/delete-outline-rounded.svg";

export default function Task({ title }) {
  const task = useStore((store) => store.tasks.find((task) => task.title === title));

  const deleteTask = useStore((store) => store.deleteTask);

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(task.title)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div onClick={() => deleteTask(task.title)}>
          <img src={deleteIcon} alt="delete icon" width="24" height="24" />
        </div>
        <div className={clsx("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
