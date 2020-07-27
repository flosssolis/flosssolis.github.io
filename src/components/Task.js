import React from 'react';

const Task = ({ task, ...props}) =>{

const IsDonebtn = () => <div className='isdone-btn'>
    {!task.done ? <p onClick={props.doneTask}><img src="https://img.icons8.com/material/24/000000/checkmark--v1.png"/></p> : <p onClick={props.deleteTask}><img src="https://img.icons8.com/ios-filled/24/000000/delete-sign.png"/></p> }
</div>
 
 const className = 'task' + (task.done ? 'task-done' : '')
    return(
        <div className={className}>
            <p>{task.title}</p>
            <IsDonebtn></IsDonebtn>
        </div>
    )
}

export default Task;