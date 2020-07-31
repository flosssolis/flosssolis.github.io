import React from "react";


const Task = ({ task, ...props }) => {
  const IsDonebtn = () => (
    <div className="isdone-btn">
      {!task.done ? (
        <p onClick={props.doneTask}>
          <img src="https://img.icons8.com/material/24/000000/checkmark--v1.png" />
        </p>
      ) : (
        <p onClick={props.deleteTask}>
          <img src="https://img.icons8.com/ios-filled/24/000000/delete-sign.png" />
        </p>
      )}
    </div>
  );

  const EditBtn = () => (
    <div className="edit-btn">
      <p onClick={props.editTask}>
        <img src="https://img.icons8.com/ios/20/000000/edit.png" />
      </p>
    </div>
  );

  const className = "task" + (task.done ? "task-done" : "");
  return (
    <div className={className}>
      {!task.edit ? <p>{task.title}</p> : <input
        onBlur={props.saveTask}
         onChange={props.handleChange}
          type="text"
          value={props.input}
          className="input"
        ></input>}
      <div className="Btns">
        {task.edit?null:<EditBtn></EditBtn>}
        <IsDonebtn></IsDonebtn>
      </div>
    </div>
  );
};

export default Task;
