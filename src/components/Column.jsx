import React, { useEffect, useRef, useState } from "react";
import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";
import clsx from "clsx";

export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) => store.tasks.filter((task) => task.state === state));

  const addTask = useStore((store) => store.addTask);

  const draggedTask = useStore((store) => store.draggedTask);

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const moveTask = useStore((store) => store.moveTask);

  return (
    <div
      className={clsx("column", { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RefTest() {
  const ref = useRef();

  useEffect(() => {
    useStore.subscribe(
      (store) => store.tasks,
      (tasks) => {
        ref.current = tasks;
      }
    );
  }, []);

  return ref.current;
}
