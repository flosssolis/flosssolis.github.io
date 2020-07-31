import React, { createElement } from "react";
import Task from "./components/Task";
import TaskInput from "./components/inputTask";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 0, title: "create todo-list", done: false, edit: false },
        {
          id: 1,
          title: "read the book",
          done: true,
          edit: false,
          class: "done",
        },
        { id: 2, title: "play tennis", done: false, edit: false },
        { id: 3, title: "something else", done: false, edit: false },
      ],
    };
  }

  componentDidMount = () => {
    let tod = JSON.parse(localStorage.getItem("todos"));
    if (tod == null) {
      this.setState({ tasks: this.state.tasks });
    } else {
      this.setState({ tasks: tod });
    }
    

    
    console.log(tod);
  };

  addTask = (task) => {
    let newTasks = [...this.state.tasks];

    newTasks.push({
      id: this.state.tasks.length !== 0 ? this.state.tasks.length : 0,
      done: false,
      title: task,
      edit: false,
    });

    this.setState({ tasks: newTasks }, this.saveData);
  };

  doneTask = (id) => {
    let newTasks = [...this.state.tasks];
    let index = newTasks.findIndex((currentValue) => currentValue.id == id);
    newTasks[index].done = true;
    this.setState({ tasks: newTasks }, this.saveData);
  };

  deleteTask = (id) => {
    let newTasks = [...this.state.tasks];
    let index = newTasks.findIndex((currentValue) => currentValue.id == id);
    newTasks.splice(index, 1);
    this.setState({ tasks: newTasks }, this.saveData);
  };

  editTask = (id) => {
    let newTasks = [...this.state.tasks];
    let index = newTasks.findIndex((currentValue) => currentValue.id == id);
    const title = newTasks[index].title;
    newTasks[index].edit = true;

    this.setState({ input: title, tasks: newTasks }, this.saveData);
  };

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  saveTask = (id) => {
    let newTasks = [...this.state.tasks];
    let index = newTasks.findIndex((currentValue) => currentValue.id == id);
    newTasks[index].edit = false;
    newTasks[index].title = this.state.input;
    this.setState({ tasks: newTasks }, this.saveData);
  };

  saveData = () => {
    let todos = this.state.tasks;
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="App">
        <h1 className="top">to-do list</h1>
        {tasks.map((task) => (
          <Task
            componentDidMount={() => this.componentDidMount()}
            doneTask={() => this.doneTask(task.id)}
            deleteTask={() => this.deleteTask(task.id)}
            editTask={() => this.editTask(task.id)}
            saveTask={() => this.saveTask(task.id)}
            handleChange={this.handleChange}
            input={this.state.input}
            saveData={() => this.saveData()}
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
