import React from "react";
import Task from "./components/Task";
import TaskInput from "./components/inputTask";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        { id: 0, title: "create todo-list", done: false },
        { id: 1, title: "read the book", done: true, class: "done" },
        { id: 2, title: "play tennis", done: false },
        { id: 3, title: "something else", done: false },
      ],
    };
  }

addTask = (task) =>{
this.setState(state =>{
  let{ tasks } = state;
  tasks.push({
    id:tasks.length !==0 ? tasks.length : 0,
    done: false,
    title: task
  });
  return tasks;
});
}


  doneTask = (id) => {
    const index = this.state.tasks.map((task) => task.id).indexOf(id);
    this.setState((state) => {
      let { tasks } = state;
      tasks[index].done = true;
      return tasks;
    });
  };

  deleteTask = (id) => {
    const index = this.state.tasks.map((task) => task.id).indexOf(id);
    this.setState((state) => {
      let { tasks } = state;
      delete tasks[index];
      return tasks;
    });
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="App">
        <h1 className="top">to-do list</h1>
        {tasks.map((task) => (
          <Task
            doneTask={() => this.doneTask(task.id)}
            deleteTask={() => this.deleteTask(task.id)}
            task={task}
            key={task.id}
          ></Task>
        ))}
<TaskInput addTask={this.addTask}></TaskInput>

      </div>
    );
  }
}

export default App;
